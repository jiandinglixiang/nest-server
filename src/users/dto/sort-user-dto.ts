import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { User } from '../domain/user';

export class SortUserDto {
  @ApiProperty()
  @IsEnum(User)
  orderBy: keyof User;

  @ApiProperty()
  @IsString()
  order: string;
}
