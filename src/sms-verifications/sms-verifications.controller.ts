import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SendSmsVerificationDto } from './dto/send-sms-verification.dto';
import { SmsVerificationsService } from './sms-verifications.service';

@Controller({
  path: 'sms-verifications',
  version: '1',
})
export class SmsVerificationsController {
  constructor(
    private readonly smsVerificationsService: SmsVerificationsService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async send(
    @Body() sendSmsVerificationDto: SendSmsVerificationDto,
  ): Promise<{ message: string }> {
    await this.smsVerificationsService.sendVerificationCode(
      sendSmsVerificationDto,
    );
    return { message: '验证码已发送' };
  }
}
