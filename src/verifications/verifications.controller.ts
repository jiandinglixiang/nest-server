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
import { verificationsService } from './verifications.service';
import { CreateverificationDto } from './dto-传输数据模型/create-verification.dto';
import { UpdateverificationDto } from './dto-传输数据模型/update-verification.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { verification } from './domain-领域数据模型/verification';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllverificationsDto } from './dto-传输数据模型/find-all-verifications.dto';

@ApiTags('Verifications')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'verifications',
  version: '1',
})
export class verificationsController {
  constructor(private readonly verificationsService: verificationsService) {}

  @Post()
  @ApiCreatedResponse({
    type: verification,
  })
  create(@Body() createverificationDto: CreateverificationDto) {
    return this.verificationsService.create(createverificationDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(verification),
  })
  async findAll(
    @Query() query: FindAllverificationsDto,
  ): Promise<InfinityPaginationResponseDto<verification>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.verificationsService.findAllWithPagination({
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
    type: verification,
  })
  findById(@Param('id') id: string) {
    return this.verificationsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: verification,
  })
  update(
    @Param('id') id: string,
    @Body() updateverificationDto: UpdateverificationDto,
  ) {
    return this.verificationsService.update(id, updateverificationDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.verificationsService.remove(id);
  }
}
