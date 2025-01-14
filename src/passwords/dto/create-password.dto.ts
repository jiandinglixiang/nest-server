import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreatePasswordDto {
  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  @IsNotEmpty()
  operatorUserID: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsNotEmpty()
  @IsString()
  userID: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
