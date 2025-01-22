import { Status } from '../../statuses/domain/status';
import { Role } from '../../roles/domain/role';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    type: () => Status,
    nullable: false,
  })
  status: Status;

  @ApiProperty({
    type: () => Role,
    nullable: false,
  })
  role: Role;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  birthTime: Date;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  gender: number;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  faceUrl: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  nickname: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  areaCode: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  phoneNumber: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
