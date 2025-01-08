import { ApiProperty } from '@nestjs/swagger';

export class Password {
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
  createTime: Date;

  @ApiProperty({
    type: Date,
    description: 'Change Time',
    example: '2023-01-02T00:00:00Z',
  })
  changeTime: Date;
}
