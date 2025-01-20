import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from './roles.enum';

export const Roles = (...roles: RoleEnum[]) => SetMetadata('roles', roles);
// 该模块用于定义一个装饰器函数Roles，用于设置角色元数据
