import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { verificationSchemaClass } from '../entities/verification.schema';
import { verificationRepository } from '../../verification.repository';
import { verification } from '../../../../domain/verification';
import { verificationMapper } from '../mappers/verification.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class verificationDocumentRepository implements verificationRepository {
  constructor(
    @InjectModel(verificationSchemaClass.name)
    private readonly verificationModel: Model<verificationSchemaClass>,
  ) {}

  async create(data: verification): Promise<verification> {
    const persistenceModel = verificationMapper.toPersistence(data);
    const createdEntity = new this.verificationModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return verificationMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<verification[]> {
    const entityObjects = await this.verificationModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      verificationMapper.toDomain(entityObject),
    );
  }

  async findById(id: verification['id']): Promise<NullableType<verification>> {
    const entityObject = await this.verificationModel.findById(id);
    return entityObject ? verificationMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: verification['id'][]): Promise<verification[]> {
    const entityObjects = await this.verificationModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      verificationMapper.toDomain(entityObject),
    );
  }

  async update(
    id: verification['id'],
    payload: Partial<verification>,
  ): Promise<NullableType<verification>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.verificationModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.verificationModel.findOneAndUpdate(
      filter,
      verificationMapper.toPersistence({
        ...verificationMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? verificationMapper.toDomain(entityObject) : null;
  }

  async remove(id: verification['id']): Promise<void> {
    await this.verificationModel.deleteOne({ _id: id });
  }
}
