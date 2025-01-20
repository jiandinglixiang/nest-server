import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { Sms } from './domain/sms';
import { CreateSmsDto } from './dto/create-sms.dto';
import { FindAllSmsDto } from './dto/find-all-sms.dto';
import { UpdateSmsDto } from './dto/update-sms.dto';
import { SmsService } from './sms.service';
import { Role } from '../roles/domain/role';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { RoleEnum } from '../roles/roles.enum';
import { BatchSendDto, SendDto } from './dto/send.dto';
import { SendResDto } from './dto/send-res.dto';

@Controller({
  path: 'sms',
  version: '1',
})
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('send')
  @ApiOkResponse({
    type: SendResDto,
  })
  async send(@Body() dto: SendDto): Promise<SendResDto> {
    // 发送短信
    return await this.smsService.send(dto);
  }

  @Post('send-batch')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(RoleEnum.admin)
  async batch(@Body() dto: BatchSendDto) {
    // 批量发送短信
    await this.smsService.send(dto);
  }
}
