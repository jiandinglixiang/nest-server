import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SmsSchemaClass } from '../entities/sms.schema';
import { SmsRepository } from '../../sms.repository';
import { Sms } from '../../../../domain/sms';
import { SmsMapper } from '../mappers/sms.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class SmsDocumentRepository implements SmsRepository {
  constructor(
    @InjectModel(SmsSchemaClass.name)
    private readonly smsModel: Model<SmsSchemaClass>,
  ) {}

  async create(data: Sms): Promise<Sms> {
    const persistenceModel = SmsMapper.toPersistence(data);
    const createdEntity = new this.smsModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return SmsMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Sms[]> {
    const entityObjects = await this.smsModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      SmsMapper.toDomain(entityObject),
    );
  }

  async findById(id: Sms['id']): Promise<NullableType<Sms>> {
    const entityObject = await this.smsModel.findById(id);
    return entityObject ? SmsMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: Sms['id'][]): Promise<Sms[]> {
    const entityObjects = await this.smsModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      SmsMapper.toDomain(entityObject),
    );
  }

  async update(
    id: Sms['id'],
    payload: Partial<Sms>,
  ): Promise<NullableType<Sms>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.smsModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.smsModel.findOneAndUpdate(
      filter,
      SmsMapper.toPersistence({
        ...SmsMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? SmsMapper.toDomain(entityObject) : null;
  }

  async remove(id: Sms['id']): Promise<void> {
    await this.smsModel.deleteOne({ _id: id });
  }
}
