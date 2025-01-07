import { verification } from '../../../../domain/verification';

import { verificationSchemaClass } from '../entities/verification.schema';

export class verificationMapper {
  public static toDomain(raw: verificationSchemaClass): verification {
    const domainEntity = new verification();
    domainEntity.code = raw.code;

    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: verification,
  ): verificationSchemaClass {
    const persistenceSchema = new verificationSchemaClass();
    persistenceSchema.code = domainEntity.code;

    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
