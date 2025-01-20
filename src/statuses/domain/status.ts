import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { StatusEnum, StatusEnumKey } from '../statuses.enum';

export class Status {
  @Allow()
  @ApiProperty({
    enum: StatusEnum,
  })
  id: StatusEnum;

  @Allow()
  @ApiProperty({
    enum: Object.keys(StatusEnum),
  })
  name?: StatusEnumKey;
}
