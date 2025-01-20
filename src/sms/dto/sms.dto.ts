import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SmsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
