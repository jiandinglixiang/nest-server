import { StatusEnum, StatusEnumKey } from '../../../../statuses.enum';

export class StatusSchema {
  _id: StatusEnum | string;

  name?: StatusEnumKey;
}
