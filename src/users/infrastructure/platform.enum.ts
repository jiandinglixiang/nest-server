export enum PlatformEnum {
  IOS = 1,
  Android = 2,
  Windows = 3,
  OSX = 4,
  Web = 5,
  MiniWeb = 6,
  Linux = 7,
  AndroidPad = 8,
  IPad = 9,
  Admin = 10,
}

export const PlatformName2ID: { [key: string]: PlatformEnum } = {
  [PlatformEnum[PlatformEnum.IOS]]: PlatformEnum.IOS,
  [PlatformEnum[PlatformEnum.Android]]: PlatformEnum.Android,
  [PlatformEnum[PlatformEnum.Windows]]: PlatformEnum.Windows,
  [PlatformEnum[PlatformEnum.OSX]]: PlatformEnum.OSX,
  [PlatformEnum[PlatformEnum.Web]]: PlatformEnum.Web,
  [PlatformEnum[PlatformEnum.MiniWeb]]: PlatformEnum.MiniWeb,
  [PlatformEnum[PlatformEnum.Linux]]: PlatformEnum.Linux,
  [PlatformEnum[PlatformEnum.AndroidPad]]: PlatformEnum.AndroidPad,
  [PlatformEnum[PlatformEnum.IPad]]: PlatformEnum.IPad,
  [PlatformEnum[PlatformEnum.Admin]]: PlatformEnum.Admin,
};

export const PlatformID2Name: { [key: number]: string } = {
  [PlatformEnum.IOS]: PlatformEnum[PlatformEnum.IOS],
  [PlatformEnum.Android]: PlatformEnum[PlatformEnum.Android],
  [PlatformEnum.Windows]: PlatformEnum[PlatformEnum.Windows],
  [PlatformEnum.OSX]: PlatformEnum[PlatformEnum.OSX],
  [PlatformEnum.Web]: PlatformEnum[PlatformEnum.Web],
  [PlatformEnum.MiniWeb]: PlatformEnum[PlatformEnum.MiniWeb],
  [PlatformEnum.Linux]: PlatformEnum[PlatformEnum.Linux],
  [PlatformEnum.AndroidPad]: PlatformEnum[PlatformEnum.AndroidPad],
  [PlatformEnum.IPad]: PlatformEnum[PlatformEnum.IPad],
  [PlatformEnum.Admin]: PlatformEnum[PlatformEnum.Admin],
};

export const PlatformName2class: { [key: string]: string } = {
  [PlatformEnum[PlatformEnum.IOS]]: 'Mobile',
  [PlatformEnum[PlatformEnum.Android]]: 'Mobile',
  [PlatformEnum[PlatformEnum.MiniWeb]]: PlatformEnum[PlatformEnum.Web],
  [PlatformEnum[PlatformEnum.Web]]: PlatformEnum[PlatformEnum.Web],
  [PlatformEnum[PlatformEnum.Windows]]: 'PC',
  [PlatformEnum[PlatformEnum.OSX]]: 'PC',
  [PlatformEnum[PlatformEnum.Linux]]: 'PC',
};

export const PlatformID2class: { [key: number]: string } = {
  [PlatformEnum.IOS]: 'Mobile',
  [PlatformEnum.Android]: 'Mobile',
  [PlatformEnum.MiniWeb]: PlatformEnum[PlatformEnum.Web],
  [PlatformEnum.Web]: PlatformEnum[PlatformEnum.Web],
  [PlatformEnum.Windows]: 'PC',
  [PlatformEnum.OSX]: 'PC',
  [PlatformEnum.Linux]: 'PC',
};

export function PlatformIDToName(num: number): string {
  return PlatformID2Name[num];
}

export function PlatformNameToID(name: string): number {
  return PlatformName2ID[name];
}

export function PlatformNameToClass(name: string): string {
  return PlatformName2class[name];
}

export function PlatformIDToClass(num: number): string {
  return PlatformID2class[num];
}
