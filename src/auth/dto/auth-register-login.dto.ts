import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMobilePhone, IsNotEmpty, Length } from 'class-validator';
import { RoleEnum } from '../../roles/roles.enum';

export class AuthRegisterLoginDto {
  @ApiProperty({
    type: String,
    description: 'Phone Number',
    example: '15577648264',
  })
  @IsMobilePhone('zh-CN')
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    description: '验证码',
    example: '123456',
  })
  @IsNotEmpty()
  @Length(6, 6)
  code: string;

  @ApiProperty({ enum: RoleEnum })
  @IsNotEmpty()
  @IsEnum(RoleEnum)
  role: RoleEnum;
}
