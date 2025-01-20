import { Sms } from '../../../../domain/sms';

import { SmsSchemaClass } from '../entities/sms.schema';

export class SmsMapper {
  public static toDomain(raw: SmsSchemaClass): Sms {
    const domainEntity = new Sms();
    domainEntity.isUsed = raw.isUsed;

    domainEntity.expiredAt = raw.expiredAt;

    domainEntity.phoneNumber = raw.phoneNumber;

    domainEntity.userID = raw.userID;

    domainEntity.code = raw.code;

    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: Sms): SmsSchemaClass {
    const persistenceSchema = new SmsSchemaClass();
    persistenceSchema.isUsed = domainEntity.isUsed;

    persistenceSchema.expiredAt = domainEntity.expiredAt;

    persistenceSchema.phoneNumber = domainEntity.phoneNumber;

    persistenceSchema.userID = domainEntity.userID;

    persistenceSchema.code = domainEntity.code;

    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
