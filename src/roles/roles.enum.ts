export enum RoleEnum {
  admin = 1,
  user = 2,
}

export type RoleEnumKey = keyof typeof RoleEnum;
