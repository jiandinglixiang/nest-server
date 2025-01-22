import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { User } from '../../domain/user';
import { FilterUserDto } from '../../dto/filter-user-dto';
import { SortUserDto } from '../../dto/sort-user-dto';

export abstract class UserRepository {
  abstract create(
    data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User>;

  abstract findAllWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<User[]>;

  abstract findById(id: User['id']): Promise<NullableType<User>>;

  abstract findByIds(ids: User['id'][]): Promise<User[]>;
  abstract findByPhone(
    phoneNumber: User['phoneNumber'],
  ): Promise<NullableType<User>>;
  abstract update(
    id: User['id'],
    payload: DeepPartial<User>,
  ): Promise<User | null>;

  abstract remove(id: User['id']): Promise<void>;
}
