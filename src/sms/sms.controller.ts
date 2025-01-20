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
import { SmsService } from './sms.service';
import { CreateSmsDto } from './dto/create-sms.dto';
import { UpdateSmsDto } from './dto/update-sms.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Sms } from './domain/sms';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllSmsDto } from './dto/find-all-sms.dto';

@ApiTags('Sms')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'sms',
  version: '1',
})
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Sms,
  })
  create(@Body() createSmsDto: CreateSmsDto) {
    return this.smsService.create(createSmsDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Sms),
  })
  async findAll(
    @Query() query: FindAllSmsDto,
  ): Promise<InfinityPaginationResponseDto<Sms>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.smsService.findAllWithPagination({
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
    type: Sms,
  })
  findById(@Param('id') id: string) {
    return this.smsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Sms,
  })
  update(@Param('id') id: string, @Body() updateSmsDto: UpdateSmsDto) {
    return this.smsService.update(id, updateSmsDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.smsService.remove(id);
  }
}
