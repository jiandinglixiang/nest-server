import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class verificationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
