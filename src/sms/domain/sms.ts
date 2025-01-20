import { ApiProperty } from '@nestjs/swagger';

export class Sms {
  @ApiProperty({
    type: () => Boolean,
    nullable: false,
  })
  isUsed: boolean;

  @ApiProperty({
    type: () => Date,
    nullable: false,
  })
  expiredAt: Date;

  @ApiProperty({
    type: String,
    nullable: false,
  })
  phoneNumber: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  userID: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  code: string;

  @ApiProperty({
    type: String,
    nullable: false,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
