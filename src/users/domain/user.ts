import { Role } from '../../roles/domain/role';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class User {
  @ApiProperty({
    type: String,
    description: 'User ID',
  })
  userID: string;

  @ApiProperty({
    type: String,
    description: 'Account',
  })
  account: string;

  @ApiProperty({
    type: String,
    description: 'Phone Number',
  })
  phoneNumber: string;

  @ApiProperty({
    type: String,
    description: 'Area Code',
    default: '86',
  })
  areaCode: string;

  @ApiProperty({
    type: String,
    description: 'Email',
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'Nickname',
  })
  nickname: string;

  @ApiProperty({
    type: String,
    description: 'Face URL',
  })
  faceUrl: string;

  @ApiProperty({
    type: Number,
    description: 'Gender',
    enum: [0, 1],
    default: 0,
  })
  gender: number;

  @ApiProperty({
    type: Date,
    description: 'Birth Time',
  })
  birthTime: Date;

  @ApiProperty({
    type: Number,
    description: 'Level',
  })
  level: number;

  @ApiProperty({
    type: Role,
    description: 'Role',
  })
  @Exclude({ toPlainOnly: true })
  role: Role;

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
