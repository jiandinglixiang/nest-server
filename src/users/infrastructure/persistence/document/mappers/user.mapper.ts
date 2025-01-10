import { User } from '../../../../domain/user';

import { UserSchemaClass } from '../entities/user.schema';
import { Role } from '../../../../../roles/domain/role';
import { RoleSchema } from '../../../../../roles/infrastructure/persistence/document/entities/role.schema';

export class UserMapper {
  static toDomain(raw: UserSchemaClass): User {
    const domainEntity = new User();
    domainEntity.id = raw._id.toString();
    domainEntity.role = new Role();
    domainEntity.role.id = raw.role._id;
    domainEntity.phoneNumber = raw.phoneNumber;
    domainEntity.areaCode = raw.areaCode;
    domainEntity.email = raw.email;
    domainEntity.nickname = raw.nickname;
    domainEntity.faceUrl = raw.faceUrl;
    domainEntity.gender = raw.gender;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.birthTime = raw.birthTime;
    domainEntity.level = raw.level;
    return domainEntity;
  }

  static toPersistence(domainEntity: User): UserSchemaClass {
    const role = new RoleSchema();
    role._id = domainEntity.role.id.toString();

    const persistenceSchema = new UserSchemaClass();
    if (domainEntity.id && typeof domainEntity.id === 'string') {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.role = role;
    persistenceSchema.phoneNumber = domainEntity.phoneNumber;
    persistenceSchema.areaCode = domainEntity.areaCode;
    persistenceSchema.email = domainEntity.email;
    persistenceSchema.nickname = domainEntity.nickname;
    persistenceSchema.faceUrl = domainEntity.faceUrl;
    persistenceSchema.gender = domainEntity.gender;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;
    persistenceSchema.birthTime = domainEntity.birthTime;
    persistenceSchema.level = domainEntity.level;
    return persistenceSchema;
  }
}
