import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { StatusEnum } from '../statuses.enum';

const idType = String;

export class Status {
  @Allow()
  @ApiProperty({
    type: idType,
  })
  id: string;

  @Allow()
  @ApiProperty({
    enum: StatusEnum,
  })
  name?: keyof typeof StatusEnum;
}
