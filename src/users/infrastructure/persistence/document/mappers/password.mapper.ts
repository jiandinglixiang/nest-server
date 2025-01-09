import { PasswordSchemaClass } from '../entities/password.schema';
import { Password } from '../../../../domain/passwword';

export class PasswordMapper {
  static toDomain(raw: PasswordSchemaClass): Password {
    const domainEntity = new Password();
    domainEntity.userID = raw.userID;
    domainEntity.password = raw.password;
    domainEntity.operatorUserID = raw.operatorUserID;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: Password): PasswordSchemaClass {
    const persistenceSchema = new PasswordSchemaClass();
    persistenceSchema.userID = domainEntity.userID;
    persistenceSchema.password = domainEntity.password;
    persistenceSchema.operatorUserID = domainEntity.operatorUserID;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;
    return persistenceSchema;
  }
}
