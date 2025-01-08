import { Injectable } from '@nestjs/common';
import { CreateverificationDto } from './dto-传输数据模型/create-verification.dto';
import { UpdateverificationDto } from './dto-传输数据模型/update-verification.dto';
import { verificationRepository } from './infrastructure-基础设施/persistence-持久化/verification.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { verification } from './domain-领域数据模型/verification';

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
