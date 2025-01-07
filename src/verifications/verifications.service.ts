import { Injectable } from '@nestjs/common';
import { CreateverificationDto } from './dto/create-verification.dto';
import { UpdateverificationDto } from './dto/update-verification.dto';
import { verificationRepository } from './infrastructure/persistence/verification.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { verification } from './domain/verification';

@Injectable()
export class verificationsService {
  constructor(
    // Dependencies here
    private readonly verificationRepository: verificationRepository,
  ) {}

  async create(createverificationDto: CreateverificationDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.verificationRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      code: createverificationDto.code,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.verificationRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: verification['id']) {
    return this.verificationRepository.findById(id);
  }

  findByIds(ids: verification['id'][]) {
    return this.verificationRepository.findByIds(ids);
  }

  async update(
    id: verification['id'],

    updateverificationDto: UpdateverificationDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.verificationRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      code: updateverificationDto.code,
    });
  }

  remove(id: verification['id']) {
    return this.verificationRepository.remove(id);
  }
}
