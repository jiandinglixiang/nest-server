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
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
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
  login(@Body() loginDto: AuthLoginDto): Promise<LoginResponseDto> {
    return this.service.validateLogin(loginDto);
  }

  @Post('register')
  async register(@Body() createUserDto: AuthRegisterLoginDto) {
    return this.service.register(createUserDto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: AuthForgotPasswordDto) {
    return this.service.forgotPassword(forgotPasswordDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: AuthResetPasswordDto) {
    return this.service.resetPassword(
      resetPasswordDto.hash,
      resetPasswordDto.password,
    );
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: RefreshResponseDto,
  })
  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  refresh(@Request() request): Promise<RefreshResponseDto> {
    return this.service.refreshToken({
      sessionId: request.user.sessionId,
      hash: request.user.hash,
    });
  }

  @ApiBearerAuth()
  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Request() request) {
    await this.service.logout(request.user.id);
  }

  //  me
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    type: User,
  })
  @ApiBearerAuth()
  me(@Request() request): Promise<NullableType<User>> {
    return this.service.me(request.user);
  }

  @Patch('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    type: User,
  })
  @ApiBearerAuth()
  update(
    @Request() request,
    @Body() userDto: AuthUpdateDto,
  ): Promise<NullableType<User>> {
    return this.service.update(request.user, userDto);
  }

  @Delete('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async delete(@Request() request) {
    await this.service.softDelete(request.user);
  }
}
