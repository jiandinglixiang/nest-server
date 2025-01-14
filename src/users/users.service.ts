import { Status } from '../statuses/domain/status';

import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Role } from '../roles/domain/role';
import { RoleEnum } from '../roles/roles.enum';
import { StatusEnum } from '../statuses/statuses.enum';
import { NullableType } from '../utils/types/nullable.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { User } from './domain/user';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto, FindUserDto, SortUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './infrastructure/persistence/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Do not remove comment below.
    // <creating-property />

    if (createUserDto.phoneNumber) {
      const userObject = await this.usersRepository.findByPhone(
        createUserDto.phoneNumber,
      );
      if (userObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            phoneNumber: '已存注册',
          },
        });
      }
    }
    if (createUserDto.role?.id) {
      const roleObject = Object.values(RoleEnum)
        .map(String)
        .includes(String(createUserDto.role.id));
      if (!roleObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            role: 'roleNotExists',
          },
        });
      }
    }
    if (createUserDto.status?.id) {
      const statusObject = Object.values(StatusEnum)
        .map(String)
        .includes(String(createUserDto.status.id));
      if (!statusObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            status: 'statusNotExists',
          },
        });
      }
    }

    const role: Role = {
      id: createUserDto.role.id,
      name: RoleEnum[createUserDto.role.id],
    };

    const status: Status = {
      id: createUserDto.status.id,
      name: StatusEnum[createUserDto.status.id],
    };

    return this.usersRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      ...createUserDto,
      role,
      status,
    });
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<User[]> {
    return this.usersRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findByUser(findUserDto: FindUserDto): Promise<NullableType<User>> {
    if (findUserDto.id) {
      return this.usersRepository.findById(findUserDto.id);
    }
    if (findUserDto.phoneNumber) {
      return this.usersRepository.findByPhone(findUserDto.phoneNumber);
    }
    if (findUserDto.email) {
      return this.usersRepository.findByEmail(findUserDto.email);
    }
    throw new UnprocessableEntityException({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      errors: {
        phone: '参数错误',
      },
    });
  }

  async update(
    id: User['id'],
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    // Do not remove comment below.
    // <updating-property />
    let phoneNumber: string | undefined = undefined;

    if (updateUserDto.phoneNumber) {
      // 检查电话是否存在
      const userObject = await this.usersRepository.findByPhone(
        updateUserDto.phoneNumber,
      );

      if (userObject && userObject.id !== updateUserDto.id) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            phone: '电话已存在',
          },
        });
      }

      phoneNumber = updateUserDto.phoneNumber;
    }

    let role: Role | undefined = undefined;

    if (updateUserDto.role?.id) {
      // 检查角色是否存在
      const roleObject = Object.values(RoleEnum)
        .map(String)
        .includes(String(updateUserDto.role.id));
      if (!roleObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            role: '角色不存在',
          },
        });
      }

      role = {
        id: updateUserDto.role.id,
        name: RoleEnum[updateUserDto.role.id],
      };
    }

    let status: Status | undefined = undefined;

    if (updateUserDto.status?.id) {
      const statusObject = Object.values(StatusEnum)
        .map(String)
        .includes(String(updateUserDto.status.id));
      if (!statusObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            status: '状态不存在',
          },
        });
      }

      status = {
        id: updateUserDto.status.id,
        name: StatusEnum[updateUserDto.status.id],
      };
    }

    return this.usersRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      ...updateUserDto,
      status,
      phoneNumber,
      role,
    });
  }
}
