import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  Equals,
  IsDate,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUrl,
  Length,
} from 'class-validator';
import { RoleDto } from '../../roles/dto/role.dto';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'Phone Number',
    example: '15577648264',
  })
  @IsMobilePhone('zh-CN')
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    type: String,
    description: 'Area Code',
    example: '86',
  })
  @Equals('86')
  areaCode: '86';

  @ApiProperty({
    type: String,
    description: 'Email',
    example: 'test@example.com',
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Nickname',
  })
  @Length(2, 10)
  @IsOptional()
  nickname: string;

  @ApiProperty({
    type: String,
    description: 'Face URL',
  })
  @IsUrl()
  @IsOptional()
  faceUrl: string;

  @ApiProperty({
    type: Number,
    description: 'Gender',
    enum: [0, 1],
  })
  @IsEnum([0, 1])
  @IsOptional()
  gender: 0 | 1;

  @ApiProperty({
    type: Date,
    description: 'Birth Time',
    example: '1990-01-01',
  })
  @IsDate()
  @IsOptional()
  birthTime: Date;

  @ApiProperty({
    type: Number,
    description: 'Level',
  })
  @IsNumber()
  @IsOptional()
  level: number;

  @ApiProperty({ type: RoleDto })
  @Type(() => RoleDto)
  @IsNotEmpty()
  role: RoleDto;
}
