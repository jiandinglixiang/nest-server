import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SmsService } from './sms.service';
import { SendBatchSmsDto } from './dto/send-batch-sms.dto';
import { SendVerificationDto } from './dto/send-verification.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';

@ApiTags('短信服务')
@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('verification/send')
  @ApiOperation({ summary: '发送验证码' })
  async sendVerificationCode(@Body() dto: SendVerificationDto): Promise<void> {
    await this.smsService.sendVerificationCode(dto.phoneNumber);
  }

  @Post('verification/verify')
  @ApiOperation({ summary: '验证验证码' })
  async verifyCode(@Body() dto: VerifyCodeDto): Promise<boolean> {
    return this.smsService.verifyCode(dto.phoneNumber, dto.code);
  }

  @Post('batch-notification')
  @ApiOperation({ summary: '发送批量通知短信' })
  async sendBatchNotification(@Body() dto: SendBatchSmsDto): Promise<void> {
    await this.smsService.sendBatchNotification(dto);
  }

  // 其他端点...
}
