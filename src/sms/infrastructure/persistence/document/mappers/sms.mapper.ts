import { Sms } from '../../../../domain/sms';
import { SmsSchemaClass } from '../entities/sms.schema';

export class SmsMapper {
  public static toDomain(raw: SmsSchemaClass): Sms {
    const domainEntity = new Sms();
    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: Sms): SmsSchemaClass {
    const persistenceSchema = new SmsSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
