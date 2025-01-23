import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ImServerSchemaClass } from '../entities/im-server.schema';
import { ImServerRepository } from '../../im-server.repository';
import { ImServer } from '../../../../domain/im-server';
import { ImServerMapper } from '../mappers/im-server.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ImServerDocumentRepository implements ImServerRepository {
  constructor(
    @InjectModel(ImServerSchemaClass.name)
    private readonly imServerModel: Model<ImServerSchemaClass>,
  ) {}

  async create(data: ImServer): Promise<ImServer> {
    const persistenceModel = ImServerMapper.toPersistence(data);
    const createdEntity = new this.imServerModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return ImServerMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ImServer[]> {
    const entityObjects = await this.imServerModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      ImServerMapper.toDomain(entityObject),
    );
  }

  async findById(id: ImServer['id']): Promise<NullableType<ImServer>> {
    const entityObject = await this.imServerModel.findById(id);
    return entityObject ? ImServerMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: ImServer['id'][]): Promise<ImServer[]> {
    const entityObjects = await this.imServerModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      ImServerMapper.toDomain(entityObject),
    );
  }

  async update(
    id: ImServer['id'],
    payload: Partial<ImServer>,
  ): Promise<NullableType<ImServer>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.imServerModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.imServerModel.findOneAndUpdate(
      filter,
      ImServerMapper.toPersistence({
        ...ImServerMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? ImServerMapper.toDomain(entityObject) : null;
  }

  async remove(id: ImServer['id']): Promise<void> {
    await this.imServerModel.deleteOne({ _id: id });
  }
}
