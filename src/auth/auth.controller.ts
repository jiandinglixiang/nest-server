import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse } from '@nestjs/swagger';
import { User } from '../users/domain/user';
import { NullableType } from '../utils/types/nullable.type';
import { AuthService } from './auth.service';
import { AuthForgotPasswordDto } from './dto/auth-forgot-password.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { AuthResetPasswordDto } from './dto/auth-reset-password.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RefreshResponseDto } from './dto/refresh-response.dto';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiOkResponse({
    type: LoginResponseDto,
  })
  @Post('login')
  public login(@Body() loginDto: AuthLoginDto): Promise<LoginResponseDto> {
    return this.service.validateLogin(loginDto);
  }

  @ApiOkResponse()
  @Post('register')
  async register(@Body() createUserDto: AuthRegisterLoginDto): Promise<void> {
    return this.service.register(createUserDto);
  }

  @ApiOkResponse()
  @Post('forgot-password')
  async forgotPassword(
    @Body() forgotPasswordDto: AuthForgotPasswordDto,
  ): Promise<void> {
    return this.service.forgotPassword(forgotPasswordDto);
  }

  @ApiOkResponse()
  @UseGuards(AuthGuard('jwt'))
  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: AuthResetPasswordDto): Promise<void> {
    return this.service.resetPassword(
      resetPasswordDto.hash,
      resetPasswordDto.password,
    );
  }

  @ApiOkResponse({
    type: RefreshResponseDto,
  })
  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  public refresh(@Request() request): Promise<RefreshResponseDto> {
    return this.service.refreshToken({
      sessionId: request.user.sessionId,
      hash: request.user.hash,
    });
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  public async logout(@Request() request): Promise<void> {
    await this.service.logout({
      sessionId: request.user.sessionId,
    });
  }

  //  me
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    type: User,
  })
  public me(@Request() request): Promise<NullableType<User>> {
    return this.service.me(request.user);
  }

  @Patch('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    type: User,
  })
  public update(
    @Request() request,
    @Body() userDto: AuthUpdateDto,
  ): Promise<NullableType<User>> {
    return this.service.update(request.user, userDto);
  }

  @Delete('me')
  @UseGuards(AuthGuard('jwt'))
  public async delete(@Request() request): Promise<void> {
    return this.service.softDelete(request.user);
  }
}
