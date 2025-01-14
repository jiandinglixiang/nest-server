import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SmsVerificationSchema,
  SmsVerificationSchemaClass,
} from './entities/sms-verification.schema';
import { SmsVerificationRepository } from '../sms-verification.repository';
import { SmsVerificationDocumentRepository } from './repositories/sms-verification.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SmsVerificationSchemaClass.name, schema: SmsVerificationSchema },
    ]),
  ],
  providers: [
    {
      provide: SmsVerificationRepository,
      useClass: SmsVerificationDocumentRepository,
    },
  ],
  exports: [SmsVerificationRepository],
})
export class DocumentSmsVerificationPersistenceModule {}
