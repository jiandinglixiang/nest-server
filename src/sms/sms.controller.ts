import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';
import { SendResDto } from './dto/send-res.dto';
import { BatchSendDto, SendDto } from './dto/send.dto';
import { SmsService } from './sms.service';

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
    return await this.smsService.send({
      phoneNumbers: [dto.phoneNumber],
    });
  }

  @Post('send-batch')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(RoleEnum.admin)
  async batch(@Body() dto: BatchSendDto) {
    // 批量发送短信
    await this.smsService.send(dto);
  }
}
