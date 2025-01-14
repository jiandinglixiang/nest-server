import { ApiProperty } from '@nestjs/swagger';
import {
  IsMobilePhone,
  IsNotEmpty,
  IsNumberString,
  Length,
} from 'class-validator';

export class AuthForgotPasswordDto {
  @ApiProperty({ example: '15577648264', type: String })
  @IsNotEmpty()
  @IsMobilePhone('zh-CN')
  phoneNumber: string;

  @ApiProperty({ example: '123456', type: String })
  @IsNotEmpty()
  @IsNumberString()
  @Length(6, 6)
  code: string;

  @ApiProperty({
    description: '密码',
    example: '123456',
  })
  @Length(6, 100)
  @IsNotEmpty()
  password: string;
}
