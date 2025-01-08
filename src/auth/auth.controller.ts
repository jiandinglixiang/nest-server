import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  Post,
  UseGuards,
  Patch,
  Delete,
  SerializeOptions,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthPhoneLoginDto } from './dto/auth-phone-login.dto';
import { AuthForgotPasswordDto } from './dto/auth-forgot-password.dto';
import { AuthResetPasswordDto } from './dto/auth-reset-password.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { NullableType } from '../utils/types/nullable.type';
import { User } from '../users/domain/user';
import { RefreshResponseDto } from './dto/refresh-response.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly service: AuthService) {}

  /**
   * 用户通过手机号登录
   * @param loginDto 包含手机号和密码的登录信息
   * @returns 登录响应数据
   */
  @SerializeOptions({
    groups: ['me'],
  })
  @ApiOkResponse({
    type: LoginResponseDto,
  })
  @Post('phone/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: AuthPhoneLoginDto): Promise<LoginResponseDto> {
    return this.service.validateLogin(loginDto);
  }

  /**
   * 用户注册
   * @param createUserDto 包含注册信息的数据传输对象
   */
  @Post('phone/register')
  @HttpCode(HttpStatus.NO_CONTENT)
  async register(@Body() createUserDto: AuthRegisterLoginDto): Promise<void> {
    return this.service.register(createUserDto);
  }

  /**
   * 忘记密码处理
   * @param forgotPasswordDto 包含手机号的数据传输对象
   */
  @Post('forgot/password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async forgotPassword(
    @Body() forgotPasswordDto: AuthForgotPasswordDto,
  ): Promise<void> {
    return this.service.forgotPassword(forgotPasswordDto.phone);
  }

  /**
   * 重置密码
   * @param resetPasswordDto 包含重置哈希和新密码的数据传输对象
   */
  @Post('reset/password')
  @HttpCode(HttpStatus.NO_CONTENT)
  resetPassword(@Body() resetPasswordDto: AuthResetPasswordDto): Promise<void> {
    return this.service.resetPassword(
      resetPasswordDto.hash,
      resetPasswordDto.password,
    );
  }

  /**
   * 刷新令牌
   * @param request 包含用户会话信息的请求对象
   * @returns 刷新令牌响应数据
   */
  @ApiBearerAuth()
  @ApiOkResponse({
    type: RefreshResponseDto,
  })
  @SerializeOptions({
    groups: ['me'],
  })
  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  refresh(@Request() request): Promise<RefreshResponseDto> {
    return this.service.refreshToken({
      sessionId: request.user.sessionId,
      hash: request.user.hash,
    });
  }

  /**
   * 用户登出
   * @param request 包含用户会话信息的请求对象
   */
  @ApiBearerAuth()
  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Request() request): Promise<void> {
    await this.service.logout({
      sessionId: request.user.sessionId,
    });
  }

  /**
   * 获取当前用户信息
   * @param request 包含用户信息的请求对象
   * @returns 当前用户信息
   */
  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    type: User,
  })
  @HttpCode(HttpStatus.OK)
  me(@Request() request): Promise<NullableType<User>> {
    return this.service.me(request.user);
  }

  /**
   * 更新当前用户信息
   * @param request 包含用户信息的请求对象
   * @param userDto 包含更新信息的数据传输对象
   * @returns 更新后的用户信息
   */
  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @Patch('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: User,
  })
  update(
    @Request() request,
    @Body() userDto: AuthUpdateDto,
  ): Promise<NullableType<User>> {
    return this.service.update(request.user, userDto);
  }

  /**
   * 删除当前用户（软删除）
   * @param request 包含用户信息的请求对象
   */
  @ApiBearerAuth()
  @Delete('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Request() request): Promise<void> {
    return this.service.softDelete(request.user);
  }
}
