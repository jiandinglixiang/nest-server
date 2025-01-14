import { Module } from '@nestjs/common';
import { SmsVerificationsService } from './sms-verifications.service';
import { SmsVerificationsController } from './sms-verifications.controller';
import { DocumentSmsVerificationPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [DocumentSmsVerificationPersistenceModule],
  controllers: [SmsVerificationsController],
  providers: [SmsVerificationsService],
  exports: [SmsVerificationsService],
})
export class SmsVerificationsModule {}
