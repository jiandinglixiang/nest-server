import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty } from 'class-validator';

export class SendVerificationDto {
  @ApiProperty({
    description: '手机号码',
    example: '13800138000',
  })
  @IsMobilePhone('zh-CN')
  @IsNotEmpty()
  phoneNumber: string;
}
