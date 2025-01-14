import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { SmsVerification } from '../../domain/sms-verification';

export abstract class SmsVerificationRepository {
  abstract create(
    data: Omit<SmsVerification, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<SmsVerification>;

  abstract findOne(
    data: Pick<SmsVerification, 'phoneNumber' | 'code'>,
  ): Promise<NullableType<SmsVerification>>;

  abstract update(
    id: SmsVerification['id'],
    payload: DeepPartial<SmsVerification>,
  ): Promise<SmsVerification | null>;

  abstract remove(id: SmsVerification['id']): Promise<void>;
}
