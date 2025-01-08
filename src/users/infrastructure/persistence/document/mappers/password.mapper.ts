import { PasswordSchemaClass } from '../entities/password.schema';
import { Password } from '../../../../domain/passwword';

export class UserMapper {
  static toDomain(raw: PasswordSchemaClass): Password {
    const domainEntity = new Password();
    domainEntity.userID = raw.userID;
    domainEntity.password = raw.password;
    domainEntity.operatorUserID = raw.operatorUserID;
    domainEntity.createTime = raw.createTime;
    domainEntity.changeTime = raw.changeTime;
    return domainEntity;
  }

  static toPersistence(domainEntity: Password): PasswordSchemaClass {
    const persistenceSchema = new PasswordSchemaClass();
    persistenceSchema.userID = domainEntity.userID;
    persistenceSchema.password = domainEntity.password;
    persistenceSchema.operatorUserID = domainEntity.operatorUserID;
    persistenceSchema.createTime = domainEntity.createTime;
    persistenceSchema.changeTime = domainEntity.changeTime;
    return persistenceSchema;
  }
}
