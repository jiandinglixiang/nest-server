import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AnonymousStrategy } from './strategies/anonymous.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { SessionModule } from '../session/session.module';
import { UsersModule } from '../users/users.module';
import { PasswordsModule } from '../passwords/passwords.module';
import { SmsModule } from '../sms/sms.module';

@Module({
  imports: [
    UsersModule,
    SessionModule,
    PassportModule,
    JwtModule.register({}),
    PasswordsModule,
    SmsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy, AnonymousStrategy],
  exports: [AuthService],
})
export class AuthModule {}
