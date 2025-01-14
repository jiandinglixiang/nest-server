import { User } from '../../../../domain/user';

import { UserSchemaClass } from '../entities/user.schema';
import { Role } from '../../../../../roles/domain/role';
import { RoleSchema } from '../../../../../roles/infrastructure/persistence/document/entities/role.schema';
import { Status } from '../../../../../statuses/domain/status';
import { StatusSchema } from '../../../../../statuses/infrastructure/persistence/document/entities/status.schema';

export class UserMapper {
  static toDomain(raw: UserSchemaClass): User {
    const domainEntity = new User();
    if (raw.status) {
    }

    domainEntity.id = raw._id.toString();
    domainEntity.role = new Role();
    domainEntity.role.id = raw.role._id;
    domainEntity.status = new Status();
    domainEntity.status.id = raw.status._id;

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
    domainEntity.deletedAt = raw.deletedAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: User): UserSchemaClass {
    const persistenceSchema = new UserSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.role = new RoleSchema();
    persistenceSchema.role._id = domainEntity.role.id.toString();
    persistenceSchema.status = new StatusSchema();
    persistenceSchema.status._id = domainEntity.status.id.toString();
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
    persistenceSchema.deletedAt = domainEntity.deletedAt;
    return persistenceSchema;
  }
}
