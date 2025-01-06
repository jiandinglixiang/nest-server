import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty, Length, MinLength } from 'class-validator';
import { RoleEnum } from '../../roles/roles.enum';

export class AuthRegisterLoginDto {
  @ApiProperty({ example: '15577648264', type: String })
  @IsMobilePhone('zh-CN')
  @IsNotEmpty()
  @Length(11)
  phone: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: RoleEnum.admin })
  @IsNotEmpty()
  role: RoleEnum;
}
