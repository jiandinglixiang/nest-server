import { RoleEnum, RoleEnumKey } from '../../../../roles.enum';

export class RoleSchemaClass {
  _id: RoleEnum | string;

  name?: RoleEnumKey;
}
