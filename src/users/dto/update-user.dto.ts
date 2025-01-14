import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    type: String,
    description: '用户ID',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    type: Date,
    description: 'deletedAt Time',
    example: '2023-01-02T00:00:00Z',
  })
  @IsOptional()
  @IsDate()
  deletedAt?: Date;
}
