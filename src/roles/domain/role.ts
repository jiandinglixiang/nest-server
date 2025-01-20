import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { RoleEnum, RoleEnumKey } from '../roles.enum';

export class Role {
  @Allow()
  @ApiProperty({
    enum: RoleEnum,
  })
  id: RoleEnum;

  @Allow()
  @ApiProperty({
    enum: Object.keys(RoleEnum),
  })
  name?: RoleEnumKey;
}
