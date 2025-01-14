import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class Sms {
  @ApiProperty({ description: '短信ID' })
  @IsString()
  id: string;

  @ApiProperty({ description: '手机号码列表' })
  @IsArray()
  @IsNotEmpty()
  phoneNumbers: string[];

  @ApiProperty({ description: '模板代码' })
  @IsString()
  templateCode: string;

  @ApiProperty({ description: '模板参数' })
  @IsObject()
  @IsNotEmpty()
  templateParam: Record<string, any>;

  @ApiProperty({ description: '签名名称' })
  @IsString()
  signName: string;

  @ApiProperty({ description: '状态', enum: ['pending', 'sent', 'failed'] })
  status: 'pending' | 'sent' | 'failed';

  @ApiProperty({ description: '业务ID', required: false })
  @IsOptional()
  @IsString()
  bizId?: string;

  @ApiProperty({ description: '请求ID', required: false })
  @IsOptional()
  @IsString()
  requestId?: string;

  @ApiProperty({ description: '消息内容', required: false })
  @IsOptional()
  @IsString()
  message?: string;

  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;
}
