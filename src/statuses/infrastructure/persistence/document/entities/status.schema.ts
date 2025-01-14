import { StatusEnum } from '../../../../statuses.enum';

export class StatusSchema {
  _id: string;

  name?: keyof typeof StatusEnum;
}
