import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { Password } from '../../domain/password';

export abstract class PasswordRepository {
  abstract create(
    data: Omit<Password, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Password>;

  abstract findById(
    userID: Password['userID'],
  ): Promise<NullableType<Password>>;

  abstract update(
    userID: Password['userID'],
    payload: DeepPartial<Password>,
  ): Promise<Password | null>;

  abstract remove(userID: Password['userID']): Promise<void>;
}
