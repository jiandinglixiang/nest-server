import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty } from 'class-validator';

export class AuthPhoneLoginDto {
  @ApiProperty({ example: '15577648264', type: String })
  @IsNotEmpty()
  @IsMobilePhone('zh-CN')
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
