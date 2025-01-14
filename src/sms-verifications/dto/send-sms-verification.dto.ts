import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty } from 'class-validator';

export class SendSmsVerificationDto {
  // 不要忘记在 DTO 属性中使用类验证器装饰器。

  @ApiProperty({
    type: String,
    description: '手机号码',
    example: '15577648264',
  })
  @IsMobilePhone('zh-CN')
  @IsNotEmpty()
  phoneNumber: string;
}
