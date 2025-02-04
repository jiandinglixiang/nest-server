export enum StatusEnum {
  'active' = 1,
  'inactive' = 2,
  'deleted' = 3,
}

export type StatusEnumKey = keyof typeof StatusEnum;
