import { ApiProperty } from '@nestjs/swagger';

export class verification {
  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  code: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
