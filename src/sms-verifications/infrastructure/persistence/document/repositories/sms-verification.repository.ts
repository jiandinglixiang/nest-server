import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SmsVerificationSchemaClass } from '../entities/sms-verification.schema';
import { SmsVerificationRepository } from '../../sms-verification.repository';
import { SmsVerification } from '../../../../domain/sms-verification';
import { SmsVerificationMapper } from '../mappers/sms-verification.mapper';

@Injectable()
export class SmsVerificationDocumentRepository
  implements SmsVerificationRepository
{
  constructor(
    @InjectModel(SmsVerificationSchemaClass.name)
    private readonly smsVerificationModel: Model<SmsVerificationSchemaClass>,
  ) {}

  async create(data: SmsVerification): Promise<SmsVerification> {
    const persistenceModel = SmsVerificationMapper.toPersistence(data);
    const createdEntity = new this.smsVerificationModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return SmsVerificationMapper.toDomain(entityObject);
  }

  async findOne(
    data: Pick<SmsVerification, 'phoneNumber' | 'code'>,
  ): Promise<NullableType<SmsVerification>> {
    const entityObject = await this.smsVerificationModel.findOne(data);
    return entityObject ? SmsVerificationMapper.toDomain(entityObject) : null;
  }

  async update(
    id: SmsVerification['id'],
    payload: Partial<SmsVerification>,
  ): Promise<NullableType<SmsVerification>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.smsVerificationModel.findOne(filter);

    if (!entity) {
      return null;
    }

    const entityObject = await this.smsVerificationModel.findOneAndUpdate(
      filter,
      SmsVerificationMapper.toPersistence({
        ...SmsVerificationMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? SmsVerificationMapper.toDomain(entityObject) : null;
  }

  async remove(id: SmsVerification['id']): Promise<void> {
    await this.smsVerificationModel.deleteOne({ _id: id });
  }
}
