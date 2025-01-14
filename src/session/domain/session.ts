import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class Session {
  @ApiProperty({ description: '会话ID' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: '用户信息' })
  @IsNotEmpty()
  @Type(() => User)
  user: User;

  @ApiProperty({ description: '会话哈希' })
  @IsString()
  @IsNotEmpty()
  hash: string;

  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;

  @ApiProperty({ description: '删除时间', required: false })
  @IsOptional()
  deletedAt: Date;
}
