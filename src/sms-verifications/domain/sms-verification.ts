import { ApiProperty } from '@nestjs/swagger';

export class SmsVerification {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    description: '手机号码',
    example: '13800138000',
  })
  phoneNumber: string;

  @ApiProperty({
    description: '验证码',
    example: '123456',
  })
  code: string;

  @ApiProperty({
    description: '是否已使用',
    default: false,
  })
  isUsed: boolean;

  @ApiProperty({
    description: '过期时间',
  })
  expiredAt: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
