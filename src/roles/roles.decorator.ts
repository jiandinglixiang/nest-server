import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: number[]) => SetMetadata('roles', roles);
// 该模块用于定义一个装饰器函数Roles，用于设置角色元数据
