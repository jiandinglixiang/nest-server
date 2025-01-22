import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsOptional } from 'class-validator';
import { RoleDto } from '../../roles/dto/role.dto';

export class FilterUserDto {
  @ApiPropertyOptional({ type: RoleDto })
  @IsOptional()
  role?: RoleDto;

  @ApiPropertyOptional({ type: String })
  @IsMobilePhone('zh-CN')
  @IsOptional()
  phoneNumber?: string;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  gender?: number;

  @ApiPropertyOptional({
    type: String,
    description: 'Email',
    example: 'test@example.com',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'User ID',
    example: '1234567890',
  })
  @IsOptional()
  id?: string;
}
