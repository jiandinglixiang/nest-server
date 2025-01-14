import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sms } from '../../domain/sms';

@Injectable()
export class SmsRepository {
  constructor(
    @InjectModel(Sms.name)
    private readonly smsModel: Model<Sms>,
  ) {}

  async create(data: Partial<Sms>): Promise<Sms> {
    const sms = new this.smsModel(data);
    return sms.save();
  }

  async findById(id: string): Promise<Sms | null> {
    return this.smsModel.findById(id).exec();
  }

  async findByPhoneNumber(phoneNumber: string): Promise<Sms[]> {
    return this.smsModel
      .find({ phoneNumbers: { $in: [phoneNumber] } })
      .sort({ createdAt: -1 })
      .exec();
  }

  async deleteById(id: string): Promise<void> {
    await this.smsModel.findByIdAndDelete(id).exec();
  }

  async deleteExpired(expirationDate: Date): Promise<void> {
    await this.smsModel
      .deleteMany({
        createdAt: { $lt: expirationDate },
        status: { $in: ['sent', 'failed'] },
      })
      .exec();
  }
}
