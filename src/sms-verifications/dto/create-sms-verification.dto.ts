import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsMobilePhone,
  IsNotEmpty,
  Length,
} from 'class-validator';
export class CreateSmsVerificationDto {
  // 不要忘记在 DTO 属性中使用类验证器装饰器。

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

  @ApiProperty({
    description: '是否已使用',
    default: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  isUsed: boolean;

  @ApiProperty({
    description: '过期时间',
    example: '2023-01-02T00:00:00Z',
  })
  @IsNotEmpty()
  @IsDate()
  expiredAt: Date;
}
