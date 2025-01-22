import { StatusDto } from '../../statuses/dto/status.dto';

import { RoleDto } from '../../roles/dto/role.dto';

import {
  // decorators here

  IsString,
  IsOptional,
  IsNumber,
  ValidateNested,
  IsNotEmptyObject,
  IsMobilePhone,
  IsNotEmpty,
  Equals,
  IsDate,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Type,
} from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    type: () => StatusDto,
  })
  @ValidateNested()
  @Type(() => StatusDto)
  @IsNotEmptyObject()
  status: StatusDto;

  @ApiProperty({
    required: true,
    type: () => RoleDto,
  })
  @ValidateNested()
  @Type(() => RoleDto)
  @IsNotEmptyObject()
  role: RoleDto;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @IsDate()
  birthTime: Date;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  gender: number;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  faceUrl: string;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  nickname: string;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @Equals('86')
  areaCode: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsMobilePhone('zh-CN')
  @IsNotEmpty()
  phoneNumber: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
