import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { ImServer } from '../../domain/im-server';

export abstract class ImServerRepository {
  abstract create(
    data: Omit<ImServer, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ImServer>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ImServer[]>;

  abstract findById(id: ImServer['id']): Promise<NullableType<ImServer>>;

  abstract findByIds(ids: ImServer['id'][]): Promise<ImServer[]>;

  abstract update(
    id: ImServer['id'],
    payload: DeepPartial<ImServer>,
  ): Promise<ImServer | null>;

  abstract remove(id: ImServer['id']): Promise<void>;
}
