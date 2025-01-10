import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class Password {
  @ApiProperty({
    type: String,
    example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae',
  })
  @Allow()
  id: string;

  @ApiProperty({
    type: String,
    description: 'User ID',
    example: '123456',
  })
  userID: string;

  @ApiProperty({
    type: String,
    description: 'Password',
    example: 'password123',
  })
  password: string;

  @ApiProperty({
    type: String,
    description: 'Operator User ID',
    example: '654321',
  })
  operatorUserID: string;

  @ApiProperty({
    type: Date,
    description: 'Creation Time',
    example: '2023-01-01T00:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'updatedAt Time',
    example: '2023-01-02T00:00:00Z',
  })
  updatedAt: Date;
}
