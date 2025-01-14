import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  Length,
} from 'class-validator';
import { RoleEnum } from '../../roles/roles.enum';

export class AuthLoginDto {
  @ApiProperty({ example: '15577648264', type: String })
  @IsNotEmpty()
  @IsMobilePhone('zh-CN')
  phoneNumber: string;

  @ApiPropertyOptional({ example: '123456', type: String })
  @IsOptional()
  @IsNumberString()
  @Length(6, 6)
  code?: string;

  @ApiPropertyOptional({
    description: '密码',
    example: '123456',
  })
  @Length(6, 100)
  @IsOptional()
  password?: string;

  @ApiPropertyOptional({
    enum: RoleEnum,
    description: '角色',
  })
  @IsNotEmpty()
  @IsEnum(RoleEnum)
  role: keyof typeof RoleEnum;
}
