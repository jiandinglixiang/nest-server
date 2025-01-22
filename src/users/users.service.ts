import { Status } from '../statuses/domain/status';

import { Role } from '../roles/domain/role';

import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { RoleEnum } from '../roles/roles.enum';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { User } from './domain/user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './infrastructure/persistence/user.repository';
import { StatusEnum } from '../statuses/statuses.enum';
import { FilterUserDto } from './dto/filter-user-dto';
import { SortUserDto } from './dto/sort-user-dto';

@Injectable()
export class UsersService {
  constructor(
    // Dependencies here
    private readonly userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Do not remove comment below.
    // <creating-property />
    const userObject = await this.userRepository.findByPhone(
      createUserDto.phoneNumber,
    );
    if (userObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          phoneNumber: '已注册',
        },
      });
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

    const status = {
      id: createUserDto.status.id,
    };

    const role = {
      id: createUserDto.role.id,
    };

    return this.userRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      status,

      role,

      birthTime: createUserDto.birthTime,

      gender: createUserDto.gender,

      faceUrl: createUserDto.faceUrl,

      nickname: createUserDto.nickname,

      areaCode: createUserDto.areaCode,

      phoneNumber: createUserDto.phoneNumber,
    });
  }

  findAllWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }) {
    return this.userRepository.findAllWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findById(id: User['id']) {
    return this.userRepository.findById(id);
  }

  findByIds(ids: User['id'][]) {
    return this.userRepository.findByIds(ids);
  }

  findByPhone(phoneNumber: User['phoneNumber']) {
    return this.userRepository.findByPhone(phoneNumber);
  }

  async update(
    id: User['id'],

    updateUserDto: UpdateUserDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let phoneNumber: string | undefined = undefined;

    if (updateUserDto.phoneNumber) {
      // 检查电话是否存在
      const userObject = await this.userRepository.findByPhone(
        updateUserDto.phoneNumber,
      );

      if (userObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            phoneNumber:
              userObject.id === id ? '与当前使用电话一致' : '电话已被使用',
          },
        });
      }

      phoneNumber = updateUserDto.phoneNumber;
    }

    if (updateUserDto.role?.id) {
      const roleObject = Object.values(RoleEnum)
        .map(String)
        .includes(String(updateUserDto.role.id));
      if (!roleObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            role: 'roleNotExists',
          },
        });
      }
    }
    if (updateUserDto.status?.id) {
      const statusObject = Object.values(StatusEnum)
        .map(String)
        .includes(String(updateUserDto.status.id));
      if (!statusObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            status: 'statusNotExists',
          },
        });
      }
    }

    let status: Status | undefined = undefined;

    if (updateUserDto.status) {
      status = {
        id: updateUserDto.status.id,
      };
    }

    const role: Role = {
      id: updateUserDto.role?.id ?? RoleEnum.user,
    };

    return this.userRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      status,

      role,
      phoneNumber,

      birthTime: updateUserDto.birthTime,

      gender: updateUserDto.gender,

      faceUrl: updateUserDto.faceUrl,

      nickname: updateUserDto.nickname,

      areaCode: updateUserDto.areaCode,
    });
  }

  remove(id: User['id']) {
    return this.userRepository.remove(id);
  }
}
