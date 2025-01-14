import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsObject, IsMobilePhone } from 'class-validator';

export class SendBatchSmsDto {
  @ApiProperty({
    description: '手机号码列表',
    example: ['13800138000', '13800138001'],
  })
  @IsArray()
  @IsMobilePhone('zh-CN', {}, { each: true })
  phoneNumbers: string[];

  @ApiProperty({
    description: '模板参数',
    example: { name: '张三', content: '您的订单已发货' },
  })
  @IsObject()
  @IsNotEmpty()
  templateParam: Record<string, any>;
}
