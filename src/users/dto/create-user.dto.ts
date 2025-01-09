import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  // decorators here
  Type,
} from 'class-transformer';
import {
  IsEmail,
  // decorators here
  IsMobilePhone,
  IsNotEmpty,
  IsUrl,
  Length,
} from 'class-validator';
import { RoleDto } from '../../roles/dto/role.dto';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'Account',
    minLength: 1,
    maxLength: 50,
  })
  @IsNotEmpty()
  account: string;

  @ApiProperty({
    type: String,
    description: 'Phone Number',
    minLength: 11,
    maxLength: 11,
  })
  @IsMobilePhone('zh-CN')
  phoneNumber: string;

  @ApiProperty({
    type: String,
    description: 'Area Code',
    default: '86',
  })
  areaCode: '86';

  @ApiProperty({
    type: String,
    description: 'Email',
  })
  @IsEmail()
  email?: string;

  @ApiProperty({
    type: String,
    description: 'Nickname',
  })
  @Length(2, 10)
  nickname: string;

  @ApiProperty({
    type: String,
    description: 'Face URL',
    minLength: 1,
    maxLength: 255,
  })
  @IsUrl()
  faceUrl: string;

  @ApiProperty({
    type: Number,
    description: 'Gender',
    enum: [0, 1],
    default: 0,
  })
  @IsNotEmpty()
  gender: 0 | 1;

  @ApiProperty({
    type: Date,
    description: 'Birth Time',
  })
  birthTime: Date;

  @ApiProperty({
    type: Number,
    description: 'Level',
  })
  level: number;

  @ApiPropertyOptional({ type: RoleDto })
  @Type(() => RoleDto)
  @IsNotEmpty()
  role: RoleDto;
}
