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

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createSmsDto: CreateSmsDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.smsRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
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

  async update(
    id: Sms['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateSmsDto: UpdateSmsDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.smsRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Sms['id']) {
    return this.smsRepository.remove(id);
  }
}
