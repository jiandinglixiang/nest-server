import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { InfinityPaginationResponseDto } from '../utils/dto/infinity-pagination-response.dto';
import { NullableType } from '../utils/types/nullable.type';
import { User } from './domain/user';
import { FindUserDto, QueryUserDto } from './dto/query-user.dto';
import { UsersService } from './users.service';
import { RolesGuard } from '../roles/roles.guard';
import { infinityPagination } from '../utils/infinity-pagination';
import { UserDto } from './dto/user.dto';

@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  // 构造函数注入UsersService
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(
    @Query() query: QueryUserDto,
  ): Promise<InfinityPaginationResponseDto<User>> {
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

  @Get('findOne')
  findOne(@Body() findUserDto: FindUserDto): Promise<NullableType<User>> {
    return this.usersService.findByUser(findUserDto);
  }

  @Post('update')
  update(@Body() updateProfileDto: UpdateUserDto): Promise<User | null> {
    return this.usersService.update(updateProfileDto.id, updateProfileDto);
  }

  @Post('remove')
  async remove(@Body() removeUserDto: UserDto): Promise<void> {
    await this.usersService.update(removeUserDto.id, {
      id: removeUserDto.id,
      deletedAt: new Date(),
    });
  }
}
