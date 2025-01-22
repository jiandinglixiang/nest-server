import { User } from '../../../../domain/user';

import { RoleMapper } from '../../../../../roles/infrastructure/persistence/document/mappers/role.mapper';

import { UserSchemaClass } from '../entities/user.schema';
import { StatusMapper } from '../../../../../statuses/infrastructure/persistence/document/mappers/status.mapper';
export class UserMapper {
  public static toDomain(raw: UserSchemaClass): User {
    const domainEntity = new User();
    if (raw.status) {
      domainEntity.status = StatusMapper.toDomain(raw.status);
    }

    if (raw.role) {
      domainEntity.role = RoleMapper.toDomain(raw.role);
    }

    domainEntity.birthTime = raw.birthTime;

    domainEntity.gender = raw.gender;

    domainEntity.faceUrl = raw.faceUrl;

    domainEntity.nickname = raw.nickname;

    domainEntity.areaCode = raw.areaCode;

    domainEntity.phoneNumber = raw.phoneNumber;

    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: User): UserSchemaClass {
    const persistenceSchema = new UserSchemaClass();
    if (domainEntity.status) {
      persistenceSchema.status = StatusMapper.toPersistence(
        domainEntity.status,
      );
    }

    if (domainEntity.role) {
      persistenceSchema.role = RoleMapper.toPersistence(domainEntity.role);
    }

    persistenceSchema.birthTime = domainEntity.birthTime;

    persistenceSchema.gender = domainEntity.gender;

    persistenceSchema.faceUrl = domainEntity.faceUrl;

    persistenceSchema.nickname = domainEntity.nickname;

    persistenceSchema.areaCode = domainEntity.areaCode;

    persistenceSchema.phoneNumber = domainEntity.phoneNumber;

    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
