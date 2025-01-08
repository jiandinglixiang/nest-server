import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { verificationSchemaClass } from '../entities-实体数据模型/verification.schema';
import { verificationRepository } from '../../verification.repository';
import { verification } from '../../../../domain-领域数据模型/verification';
import { verificationMapper } from '../mappers-映射转换/verification.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

// 实现 数据库抽象类接口  增删改查
@Injectable()
export class verificationDocumentRepository implements verificationRepository {
  constructor(
    @InjectModel(verificationSchemaClass.name)
    private readonly verificationModel: Model<verificationSchemaClass>,
  ) {}

  /**
   * 创建一个新的验证码
   * @param data 验证码对象
   * @returns 保存后的验证码对象
   */
  async create(data: verification): Promise<verification> {
    // 将 domain 对象转换为 persistence 对象
    const persistenceModel = verificationMapper.toPersistence(data);
    //  new 一个新的 Mongoose 文档
    const createdEntity = new this.verificationModel(persistenceModel);
    // 保存文档
    const entityObject = await createdEntity.save();
    // 将 persistence 对象转换为 domain 对象
    return verificationMapper.toDomain(entityObject);
  }

  /**
   *  Paginated query of all records
   * @param paginationOptions 分页参数
   * @returns  Page of records
   */
  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<verification[]> {
    //  offset
    const skip = (paginationOptions.page - 1) * paginationOptions.limit;
    //  limit
    const limit = paginationOptions.limit;
    // 查询所有
    const entityObjects = await this.verificationModel
      .find()
      .skip(skip)
      .limit(limit);

    // 将 persistence 对象转换为 domain 对象
    return entityObjects.map((entityObject) =>
      verificationMapper.toDomain(entityObject),
    );
  }

  /**
   * 通过 ID 查询一个验证码
   * @param id 验证码 ID
   * @returns  Record or null
   */
  async findById(id: verification['id']): Promise<NullableType<verification>> {
    //  ID  query
    const entityObject = await this.verificationModel.findById(id);
    // 如果没找到
    if (!entityObject) {
      //  null
      return null;
    }
    // 将 persistence 对象转换为 domain 对象
    return verificationMapper.toDomain(entityObject);
  }

  /**
   * 通过 ID 们查询多个验证码
   * @param ids 验证码 ID 们
   * @returns  Records
   */
  async findByIds(ids: verification['id'][]): Promise<verification[]> {
    //  IDs  query
    const entityObjects = await this.verificationModel.find({
      _id: { $in: ids },
    });
    // 将 persistence 对象转换为 domain 对象
    return entityObjects.map((entityObject) =>
      verificationMapper.toDomain(entityObject),
    );
  }

  /**
   * 通过 ID  更新一个验证码
   * @param id 验证码 ID
   * @param payload  Partial  Record
   * @returns  Updated Record or null
   */
  async update(
    id: verification['id'],
    payload: Partial<verification>,
  ): Promise<NullableType<verification>> {
    // clone  payload
    const clonedPayload = { ...payload };
    //   ID  payload
    delete clonedPayload.id;

    //  ID  query
    const filter = { _id: id.toString() };
    //  record
    const entity = await this.verificationModel.findOne(filter);

    if (!entity) {
      //  Not Found
      throw new Error(' ');
    }

    //   entity  payload
    const entityObject = await this.verificationModel.findOneAndUpdate(
      filter,
      verificationMapper.toPersistence({
        //   domain 对象
        ...verificationMapper.toDomain(entity),
        //   payload
        ...clonedPayload,
      }),
      //  new  document
      { new: true },
    );

    //  null
    if (!entityObject) {
      return null;
    }

    // 将 persistence 对象转换为 domain 对象
    return verificationMapper.toDomain(entityObject);
  }

  /**
   * 通过 ID  删除一个验证码
   * @param id 验证码 ID
   * @returns  void
   */
  async remove(id: verification['id']): Promise<void> {
    //  ID  query
    await this.verificationModel.deleteOne({ _id: id });
  }
}
