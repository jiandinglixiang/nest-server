import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { verification } from '../../domain/verification';

export abstract class verificationRepository {
  abstract create(
    data: Omit<verification, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<verification>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<verification[]>;

  abstract findById(
    id: verification['id'],
  ): Promise<NullableType<verification>>;

  abstract findByIds(ids: verification['id'][]): Promise<verification[]>;

  abstract update(
    id: verification['id'],
    payload: DeepPartial<verification>,
  ): Promise<verification | null>;

  abstract remove(id: verification['id']): Promise<void>;
}
