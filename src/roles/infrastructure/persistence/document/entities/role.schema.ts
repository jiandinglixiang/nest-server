import { RoleEnum } from '../../../../roles.enum';

export class RoleSchema {
  _id: string;

  name?: keyof typeof RoleEnum;
}
