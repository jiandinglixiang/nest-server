import { StatusSchemaClass } from '../entities/status.schema';
import { Status } from '../../../../domain/status';
import { StatusEnum } from '../../../../statuses.enum';

export class StatusMapper {
  public static toDomain(raw: StatusSchemaClass): Status {
    const domainEntity = new Status();
    domainEntity.id = raw._id as StatusEnum;
    domainEntity.name = raw.name;
    return domainEntity;
  }

  public static toPersistence(domainEntity: Status): StatusSchemaClass {
    const persistenceSchema = new StatusSchemaClass();
    persistenceSchema._id = domainEntity.id;
    persistenceSchema.name = domainEntity.name;
    return persistenceSchema;
  }
}
