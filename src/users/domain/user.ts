import { Status } from '../../statuses/domain/status';
import { Role } from '../../roles/domain/role';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Allow } from 'class-validator';

export class User {
  @ApiProperty({
    type: String,
    example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae',
  })
  @Allow()
  id: string;

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
    type: () => Status,
  })
  status: Status;

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

  @ApiProperty({
    type: Date,
    description: 'deletedAt Time',
    example: '2023-01-02T00:00:00Z',
  })
  deletedAt: Date;
}
