import { PasswordSchemaClass } from '../entities/password.schema';

export class PasswordMapper {
  static toDomain(raw: PasswordSchemaClass): Password {
    const domainEntity = new Password();
    domainEntity.id = raw._id.toString();
    domainEntity.userID = raw.userID;
    domainEntity.password = raw.password;
    domainEntity.operatorUserID = raw.operatorUserID;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: Password): PasswordSchemaClass {
    const persistenceSchema = new PasswordSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.userID = domainEntity.userID;
    persistenceSchema.password = domainEntity.password;
    persistenceSchema.operatorUserID = domainEntity.operatorUserID;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;
    return persistenceSchema;
  }
}
