import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMobilePhone } from 'class-validator';

export class AuthForgotPasswordDto {
  @ApiProperty({ example: '15577648264', type: String })
  @IsNotEmpty()
  @IsMobilePhone('zh-CN')
  phone: string;
}
