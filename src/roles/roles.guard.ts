import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  // 构造函数注入Reflector，用于获取元数据
  constructor(private reflector: Reflector) {}

  // canActivate方法用于判断当前请求是否有权限访问
  canActivate(context: ExecutionContext): boolean {
    // 获取角色元数据，可能是数字或字符串数组
    const roles = this.reflector.getAllAndOverride<(number | string)[]>(
      'roles',
      [context.getClass(), context.getHandler()],
    );
    // 如果没有角色限制，直接返回true，允许访问
    if (!roles.length) {
      return true;
    }
    // 获取当前请求对象
    const request = context.switchToHttp().getRequest();

    // 检查请求用户的角色ID是否在允许的角色列表中
    return roles.map(String).includes(String(request.user?.role?.id));
  }
}
