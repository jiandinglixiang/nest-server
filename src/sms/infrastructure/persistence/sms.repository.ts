import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Sms } from '../../domain/sms';

export abstract class SmsRepository {
  abstract create(
    data: Omit<Sms, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Sms>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Sms[]>;

  abstract findById(id: Sms['id']): Promise<NullableType<Sms>>;

  abstract findByIds(ids: Sms['id'][]): Promise<Sms[]>;

  abstract update(
    id: Sms['id'],
    payload: DeepPartial<Sms>,
  ): Promise<Sms | null>;

  abstract remove(id: Sms['id']): Promise<void>;
}
