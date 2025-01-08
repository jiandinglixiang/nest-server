import { verification } from '../../../../domain-领域数据模型/verification';

import { verificationSchemaClass } from '../entities-实体数据模型/verification.schema';

// 相当于一个转换器，vue中的getter和setter
export class verificationMapper {
  /**
   * 将 Persistence 对象转换为 Domain 对象
   * @param raw Persistence 对象
   * @returns Domain 对象
   */
  public static toDomain(raw: verificationSchemaClass): verification {
    const domainEntity = new verification();
    domainEntity.code = raw.code;

    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  /**
   *  Domain 对象转换为 Persistence 对象
   * @param domainEntity Domain 对象
   * @returns Persistence 对象
   */
  public static toPersistence(
    domainEntity: verification,
  ): verificationSchemaClass {
    const persistenceSchema = new verificationSchemaClass();
    persistenceSchema.code = domainEntity.code;

    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
