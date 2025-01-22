import { Role } from '../../../../domain/role';
import { RoleEnum } from '../../../../roles.enum';
import { RoleSchemaClass } from '../entities/role.schema';

export class RoleMapper {
  public static toDomain(raw: RoleSchemaClass): Role {
    const domainEntity = new Role();
    domainEntity.id = raw._id as RoleEnum;
    domainEntity.name = raw.name;
    return domainEntity;
  }

  public static toPersistence(domainEntity: Role): RoleSchemaClass {
    const persistenceSchema = new RoleSchemaClass();
    persistenceSchema._id = domainEntity.id;
    persistenceSchema.name = domainEntity.name;
    return persistenceSchema;
  }
}
