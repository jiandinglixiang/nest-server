import {
  HttpStatus,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import ms from 'ms';
import { AllConfigType } from '../config/config.type';
import { PasswordsService } from '../passwords/passwords.service';
import { Session } from '../session/domain/session';
import { SessionService } from '../session/session.service';
import { SmsService } from '../sms/sms.service';
import { StatusEnum } from '../statuses/statuses.enum';
import { User } from '../users/domain/user';
import { UsersService } from '../users/users.service';
import { NullableType } from '../utils/types/nullable.type';
import { AuthForgotPasswordDto } from './dto/auth-forgot-password.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { JwtPayloadType } from './strategies/types/jwt-payload.type';
import { JwtRefreshPayloadType } from './strategies/types/jwt-refresh-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private sessionService: SessionService,
    private configService: ConfigService<AllConfigType>,
    private passwordsService: PasswordsService,
    private smsService: SmsService,
  ) {}

  async validateLogin(loginDto: AuthLoginDto): Promise<LoginResponseDto> {
    if (!(loginDto.phoneNumber || loginDto.code)) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          phoneNumber: '手机号或验证码不能为空',
        },
      });
    }
    const user = await this.usersService.findByPhone(loginDto.phoneNumber);

    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          phoneNumber: '用户不存在',
        },
      });
    }
    if (loginDto?.code) {
      const code = await this.smsService.verifyCode(
        loginDto.phoneNumber,
        loginDto.code,
      );
      if (!code) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            code: '验证码错误',
          },
        });
      }
    } else if (loginDto?.password) {
      const password = await this.passwordsService.findById(user.id);
      if (!password) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            password: '用户未设置密码',
          },
        });
      }
      const isValidPassword = await bcrypt.compare(
        loginDto.password,
        password.password,
      );
      if (!isValidPassword) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            password: '密码错误',
          },
        });
      }
    }

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    const session = await this.sessionService.create({
      user,
      hash,
    });

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: user.id,
      role: user.role,
      sessionId: session.id,
      hash,
    });

    return {
      refreshToken,
      token,
      tokenExpires,
      user,
    };
  }

  async register(dto: AuthRegisterLoginDto): Promise<void> {
    const user = await this.usersService.findByPhone(dto.phoneNumber);
    // 如果用户存在，则抛出错误
    if (user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          phoneNumber: '手机号已注册',
        },
      });
    }
    // 验证验证码
    const code = await this.smsService.verifyCode(dto.phoneNumber, dto.code);
    if (!code) {
      return;
    }

    await this.usersService.create({
      phoneNumber: dto.phoneNumber,
      nickname:
        dto.phoneNumber.slice(0, 3) + '****' + dto.phoneNumber.slice(-4),
      role: {
        id: dto.role,
      },
      status: {
        id: StatusEnum.inactive,
      },
      birthTime: new Date(),
      gender: 0,
      faceUrl: '',
      areaCode: '86',
    });
  }

  async forgotPassword(dto: AuthForgotPasswordDto): Promise<void> {
    const user = await this.usersService.findByPhone(dto.phoneNumber);

    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          phoneNumber: '用户不存在',
        },
      });
    }
    const code = await this.smsService.verifyCode(dto.phoneNumber, dto.code);
    if (!code) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          code: '验证码错误',
        },
      });
    }
    // 更新密码
    await this.passwordsService.update(user.id, {
      password: dto.password,
      operatorUserID: user.id,
    });
    // 清理状态
    await this.sessionService.deleteByUserId({
      userId: user.id,
    });
  }

  async resetPassword(hash: string, password: string): Promise<void> {
    let userId: User['id'];

    try {
      const jwtData = await this.jwtService.verifyAsync<{
        forgotUserId: User['id'];
      }>(hash, {
        secret: this.configService.getOrThrow('auth.forgotSecret', {
          infer: true,
        }),
      });

      userId = jwtData.forgotUserId;
    } catch {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          hash: `无效的哈希值`,
        },
      });
    }

    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          hash: `未找到`,
        },
      });
    }

    await this.passwordsService.update(user.id, {
      password,
      operatorUserID: user.id,
    });

    await this.sessionService.deleteByUserId({
      userId: user.id,
    });
  }

  async refreshToken(
    data: Pick<JwtRefreshPayloadType, 'sessionId' | 'hash'>,
  ): Promise<Omit<LoginResponseDto, 'user'>> {
    const session = await this.sessionService.findById(data.sessionId);

    if (!session) {
      throw new UnauthorizedException();
    }

    if (session.hash !== data.hash) {
      throw new UnauthorizedException();
    }

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    const user = await this.usersService.findById(session.user.id);

    if (!user?.role) {
      throw new UnauthorizedException();
    }

    await this.sessionService.update(session.id, {
      hash,
    });

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: session.user.id,
      role: {
        id: user.role.id,
      },
      sessionId: session.id,
      hash,
    });

    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }

  me(userJwtPayload: JwtPayloadType): Promise<NullableType<User>> {
    return this.usersService.findById(userJwtPayload.id);
  }

  async update(
    userJwtPayload: JwtPayloadType,
    userDto: AuthUpdateDto,
  ): Promise<NullableType<User>> {
    // 更新用户资料
    return await this.usersService.update(userJwtPayload.id, userDto);
  }

  async logout(userId: User['id']) {
    return this.sessionService.deleteByUserId({
      userId,
    });
  }

  async softDelete(user: JwtPayloadType): Promise<void> {
    await this.sessionService.deleteById(user.sessionId);
    await this.usersService.remove(user.id);
  }

  private async getTokensData(data: {
    id: User['id'];
    role: User['role'];
    sessionId: Session['id'];
    hash: Session['hash'];
  }) {
    const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
      infer: true,
    });

    const tokenExpires = Date.now() + ms(tokenExpiresIn);

    const [token, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(
        {
          id: data.id,
          role: data.role,
          sessionId: data.sessionId,
        },
        {
          secret: this.configService.getOrThrow('auth.secret', { infer: true }),
          expiresIn: tokenExpiresIn,
        },
      ),
      await this.jwtService.signAsync(
        {
          sessionId: data.sessionId,
          hash: data.hash,
        },
        {
          secret: this.configService.getOrThrow('auth.refreshSecret', {
            infer: true,
          }),
          expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
            infer: true,
          }),
        },
      ),
    ]);

    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }
}
