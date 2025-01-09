import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { User } from '../../domain/user';

import { FilterUserDto, SortUserDto } from '../../dto/query-user.dto';

export abstract class UserRepository {
  abstract create(
    data: Omit<User, 'userID' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<User>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<User[]>;

  abstract findById(userID: User['userID']): Promise<NullableType<User>>;
  abstract findByIds(userIDs: User['userID'][]): Promise<User[]>;
  abstract findByPhone(
    phoneNumber: User['phoneNumber'],
  ): Promise<NullableType<User>>;
  abstract update(
    userID: User['userID'],
    payload: DeepPartial<User>,
  ): Promise<User | null>;

  abstract remove(userID: User['userID']): Promise<void>;
}
