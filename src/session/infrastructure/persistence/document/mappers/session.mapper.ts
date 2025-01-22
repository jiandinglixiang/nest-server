import { UserMapper } from '../../../../../users/infrastructure/persistence/document/mappers/user.mapper';
import { Session } from '../../../../domain/session';
import { SessionSchemaClass } from '../entities/session.schema';

export class SessionMapper {
  static toDomain(raw: SessionSchemaClass): Session {
    const domainEntity = new Session();
    domainEntity.id = raw._id.toString();

    if (raw.user) {
      domainEntity.user = UserMapper.toDomain(raw.user);
    }

    domainEntity.hash = raw.hash;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;
    return domainEntity;
  }
  static toPersistence(domainEntity: Session): SessionSchemaClass {
    const sessionEntity = new SessionSchemaClass();
    if (domainEntity.id) {
      sessionEntity._id = domainEntity.id;
    }
    if (domainEntity.user) {
      sessionEntity.user = UserMapper.toPersistence(domainEntity.user);
    }
    sessionEntity.hash = domainEntity.hash;
    sessionEntity.createdAt = domainEntity.createdAt;
    sessionEntity.updatedAt = domainEntity.updatedAt;
    sessionEntity.deletedAt = domainEntity.deletedAt;
    return sessionEntity;
  }
}
