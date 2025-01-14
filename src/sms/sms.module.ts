import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SmsController } from './sms.controller';
import { SmsService } from './sms.service';
import { SmsRepository } from './infrastructure/persistence/sms.repository';
import {
  SmsDocument,
  SmsSchema,
} from './infrastructure/persistence/document/schemas/sms.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SmsDocument.name,
        schema: SmsSchema,
      },
    ]),
  ],
  controllers: [SmsController],
  providers: [SmsService, SmsRepository],
  exports: [SmsService],
})
export class SmsModule {}
