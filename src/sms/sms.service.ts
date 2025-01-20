import { Injectable } from '@nestjs/common';
import { CreateSmsDto } from './dto/create-sms.dto';
import { UpdateSmsDto } from './dto/update-sms.dto';
import { SmsRepository } from './infrastructure/persistence/sms.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Sms } from './domain/sms';

@Injectable()
export class SmsService {
  constructor(
    // Dependencies here
    private readonly smsRepository: SmsRepository,
  ) {}

  async create(createSmsDto: CreateSmsDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.smsRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      isUsed: createSmsDto.isUsed,

      expiredAt: createSmsDto.expiredAt,

      phoneNumber: createSmsDto.phoneNumber,

      userID: createSmsDto.userID,

      code: createSmsDto.code,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.smsRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Sms['id']) {
    return this.smsRepository.findById(id);
  }

  findByIds(ids: Sms['id'][]) {
    return this.smsRepository.findByIds(ids);
  }

  update(
    id: Sms['id'],

    updateSmsDto: UpdateSmsDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.smsRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      isUsed: updateSmsDto.isUsed,

      expiredAt: updateSmsDto.expiredAt,

      phoneNumber: updateSmsDto.phoneNumber,

      userID: updateSmsDto.userID,

      code: updateSmsDto.code,
    });
  }

  remove(id: Sms['id']) {
    return this.smsRepository.remove(id);
  }

  verifyCode(phoneNumber: any, code: string) {
    console.log(phoneNumber, code);
    return true;
  }
}
