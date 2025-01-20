import {
  IsBoolean,
  IsDate,
  IsMobilePhone,
  IsNotEmpty,
  // decorators here
  IsString,
  Length,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateSmsDto {
  @ApiProperty({
    required: true,
    type: () => Boolean,
  })
  @IsBoolean()
  @IsNotEmpty()
  isUsed: boolean;

  @ApiProperty({
    required: true,
    type: () => Date,
  })
  @IsNotEmpty()
  @IsDate()
  expiredAt: Date;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsNotEmpty()
  @IsMobilePhone('zh-CN')
  @Length(11, 11)
  phoneNumber: string;

  @ApiPropertyOptional({
    type: () => String,
  })
  @IsString()
  userID: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsNotEmpty()
  @Length(6, 6)
  code: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
