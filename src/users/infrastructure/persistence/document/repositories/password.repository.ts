import { Injectable } from '@nestjs/common';
import { Password } from '../../../../domain/passwword';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { PasswordRepository } from '../../password.repository';
import { PasswordSchemaClass } from '../entities/password.schema';
import { PasswordMapper } from '../mappers/password.mapper';

@Injectable()
export class PasswordDocumentRepository implements PasswordRepository {
  constructor(
    @InjectModel(PasswordSchemaClass.name)
    private readonly passwordsModel: Model<PasswordSchemaClass>,
  ) {}

  async create(data: Password): Promise<Password> {
    const persistenceModel = PasswordMapper.toPersistence(data);
    const createdPassword = new this.passwordsModel(persistenceModel);
    const passwordObject = await createdPassword.save();
    return PasswordMapper.toDomain(passwordObject);
  }

  async findById(userID: Password['userID']): Promise<NullableType<Password>> {
    const passwordObject = await this.passwordsModel.findOne({ userID });
    return passwordObject ? PasswordMapper.toDomain(passwordObject) : null;
  }

  async update(
    userID: Password['userID'],
    payload: Partial<Password>,
  ): Promise<Password | null> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id; // 不能往里加id

    const filter = { userID };
    const password = await this.passwordsModel.findOne(filter);

    if (!password) {
      return null;
    }

    const passwordObject = await this.passwordsModel.findOneAndUpdate(
      filter,
      PasswordMapper.toPersistence({
        ...PasswordMapper.toDomain(password),
        ...clonedPayload,
      }),
      { new: true },
    );

    return passwordObject ? PasswordMapper.toDomain(passwordObject) : null;
  }

  async remove(userID: Password['userID']): Promise<void> {
    await this.passwordsModel.deleteOne({
      userID,
    });
  }
}
