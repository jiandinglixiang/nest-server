import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty, Length } from 'class-validator';

export class VerifyCodeDto {
  @ApiProperty({
    description: '手机号码',
    example: '13800138000',
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
}
