import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { RoleEnum } from '../roles.enum';

const idType = String;

export class Role {
  @Allow()
  @ApiProperty({
    type: idType,
  })
  id: string;

  @Allow()
  @ApiProperty({
    type: String,
    enum: RoleEnum,
  })
  name?: keyof typeof RoleEnum;
}
