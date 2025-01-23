import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ImServersService } from './im-servers.service';
import { CreateImServerDto } from './dto/create-im-server.dto';
import { UpdateImServerDto } from './dto/update-im-server.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ImServer } from './domain/im-server';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllImServersDto } from './dto/find-all-im-servers.dto';

@ApiTags('Imservers')
// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'im-servers',
  version: '1',
})
export class ImServersController {
  constructor(private readonly imServersService: ImServersService) {}

  @Post()
  @ApiCreatedResponse({
    type: ImServer,
  })
  create(@Body() createImServerDto: CreateImServerDto) {
    return this.imServersService.create(createImServerDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(ImServer),
  })
  async findAll(
    @Query() query: FindAllImServersDto,
  ): Promise<InfinityPaginationResponseDto<ImServer>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.imServersService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ImServer,
  })
  findById(@Param('id') id: string) {
    return this.imServersService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ImServer,
  })
  update(
    @Param('id') id: string,
    @Body() updateImServerDto: UpdateImServerDto,
  ) {
    return this.imServersService.update(id, updateImServerDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.imServersService.remove(id);
  }
}
