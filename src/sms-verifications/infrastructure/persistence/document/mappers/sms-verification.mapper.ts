import { SmsVerification } from '../../../../domain/sms-verification';
import { SmsVerificationSchemaClass } from '../entities/sms-verification.schema';

export class SmsVerificationMapper {
  public static toDomain(raw: SmsVerificationSchemaClass): SmsVerification {
    const domainEntity = new SmsVerification();
    domainEntity.id = raw._id.toString();
    domainEntity.phoneNumber = raw.phoneNumber;
    domainEntity.code = raw.code;
    domainEntity.isUsed = raw.isUsed;
    domainEntity.expiredAt = raw.expiredAt;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: SmsVerification,
  ): SmsVerificationSchemaClass {
    const persistenceSchema = new SmsVerificationSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.phoneNumber = domainEntity.phoneNumber;
    persistenceSchema.code = domainEntity.code;
    persistenceSchema.isUsed = domainEntity.isUsed;
    persistenceSchema.expiredAt = domainEntity.expiredAt;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
