import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpStatus,
  HttpCode,
  SerializeOptions,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';

import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { NullableType } from '../utils/types/nullable.type';
import { QueryUserDto } from './dto/query-user.dto';
import { User } from './domain/user';
import { UsersService } from './users.service';
import { RolesGuard } from '../roles/roles.guard';
import { infinityPagination } from '../utils/infinity-pagination';

// 使用@ApiBearerAuth装饰器来启用Bearer认证
@ApiBearerAuth()
// 使用@Roles装饰器来限制访问权限，仅允许admin角色访问
@Roles(RoleEnum.admin)
// 使用@UseGuards装饰器来启用JWT认证和角色守卫
@UseGuards(AuthGuard('jwt'), RolesGuard)
// 使用@ApiTags装饰器为控制器添加标签
@ApiTags('Users 仅允许admin角色访问')
// 定义控制器的路径和版本
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  // 构造函数注入UsersService
  constructor(private readonly usersService: UsersService) {}

  // 使用@ApiCreatedResponse装饰器来定义创建用户成功的响应
  @ApiCreatedResponse({
    type: User,
  })
  // 使用@SerializeOptions装饰器来指定序列化选项
  @SerializeOptions({
    groups: ['admin'],
  })
  // 定义POST请求的处理方法，用于创建用户
  @Post()
  // 设置HTTP状态码为201（已创建）
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProfileDto: CreateUserDto): Promise<User> {
    // 调用UsersService的create方法来创建用户
    return this.usersService.create(createProfileDto);
  }

  // 使用@ApiOkResponse装饰器来定义获取用户列表成功的响应
  @ApiOkResponse({
    type: InfinityPaginationResponse(User),
  })
  // 使用@SerializeOptions装饰器来指定序列化选项
  @SerializeOptions({
    groups: ['admin'],
  })
  // 定义GET请求的处理方法，用于获取用户列表
  @Get()
  // 设置HTTP状态码为200（成功）
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryUserDto,
  ): Promise<InfinityPaginationResponseDto<User>> {
    // 获取分页参数
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    // 调用UsersService的findManyWithPagination方法来获取用户列表，并进行无限分页处理
    return infinityPagination(
      await this.usersService.findManyWithPagination({
        filterOptions: query?.filters,
        sortOptions: query?.sort,
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  // 使用@ApiOkResponse装饰器来定义获取单个用户成功的响应
  @ApiOkResponse({
    type: User,
  })
  // 使用@SerializeOptions装饰器来指定序列化选项
  @SerializeOptions({
    groups: ['admin'],
  })
  // 定义GET请求的处理方法，用于获取单个用户
  @Get(':id')
  // 设置HTTP状态码为200（成功）
  @HttpCode(HttpStatus.OK)
  // 使用@ApiParam装饰器来定义路径参数
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: User['id']): Promise<NullableType<User>> {
    // 调用UsersService的findById方法来获取用户
    return this.usersService.findById(id);
  }

  // 使用@ApiOkResponse装饰器来定义更新用户成功的响应
  @ApiOkResponse({
    type: User,
  })
  // 使用@SerializeOptions装饰器来指定序列化选项
  @SerializeOptions({
    groups: ['admin'],
  })
  // 定义PATCH请求的处理方法，用于更新用户
  @Patch(':id')
  // 设置HTTP状态码为200（成功）
  @HttpCode(HttpStatus.OK)
  // 使用@ApiParam装饰器来定义路径参数
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  update(
    @Param('id') id: User['id'],
    @Body() updateProfileDto: UpdateUserDto,
  ): Promise<User | null> {
    // 调用UsersService的update方法来更新用户
    return this.usersService.update(id, updateProfileDto);
  }

  // 定义DELETE请求的处理方法，用于删除用户
  @Delete(':id')
  // 使用@ApiParam装饰器来定义路径参数
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  // 设置HTTP状态码为204（无内容）
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: User['id']): Promise<void> {
    // 调用UsersService的remove方法来删除用户
    return this.usersService.remove(id);
  }
}
