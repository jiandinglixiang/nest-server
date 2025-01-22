import { StatusEnum, StatusEnumKey } from '../../../../statuses.enum';

export class StatusSchemaClass {
  _id: StatusEnum | string;

  name?: StatusEnumKey;
}
