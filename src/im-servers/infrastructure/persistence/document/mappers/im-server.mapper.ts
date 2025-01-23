import { ImServer } from '../../../../domain/im-server';
import { ImServerSchemaClass } from '../entities/im-server.schema';

export class ImServerMapper {
  public static toDomain(raw: ImServerSchemaClass): ImServer {
    const domainEntity = new ImServer();
    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: ImServer): ImServerSchemaClass {
    const persistenceSchema = new ImServerSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
