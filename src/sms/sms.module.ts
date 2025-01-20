import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigService],
  providers: [SmsService],
  exports: [SmsService],
})
export class SmsModule {}
