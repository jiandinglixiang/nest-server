import { RoleEnum, RoleEnumKey } from '../../../../roles.enum';

export class RoleSchema {
  _id: RoleEnum | string;

  name?: RoleEnumKey;
}
