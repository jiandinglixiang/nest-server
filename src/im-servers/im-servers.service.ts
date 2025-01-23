import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ImServer } from './domain/im-server';
import { CreateImServerDto } from './dto/create-im-server.dto';
import { UpdateImServerDto } from './dto/update-im-server.dto';
import { ImServerRepository } from './infrastructure/persistence/im-server.repository';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ImServersService {
  constructor(
    // Dependencies here
    private readonly imServerRepository: ImServerRepository,
    private readonly httpService: HttpService,
  ) {}

  async create(createImServerDto: CreateImServerDto) {
    // Do not remove comment below.
    // <creating-property />
    console.log(createImServerDto);
    const res = await firstValueFrom(
      this.httpService.post('/auth/get_user_token', {
        platformID: 1,
        userID: '6314209227',
      }),
    );
    console.log(res);
    // return this.imServerRepository.create({
    //   // Do not remove comment below.
    //   // <creating-property-payload />
    // });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.imServerRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: ImServer['id']) {
    return this.imServerRepository.findById(id);
  }

  findByIds(ids: ImServer['id'][]) {
    return this.imServerRepository.findByIds(ids);
  }

  async update(
    id: ImServer['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateImServerDto: UpdateImServerDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.imServerRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: ImServer['id']) {
    return this.imServerRepository.remove(id);
  }
}
