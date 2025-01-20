import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SmsController } from './sms.controller';
import { DocumentSmsPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    DocumentSmsPersistenceModule,
  ],
  controllers: [SmsController],
  providers: [SmsService],
  exports: [SmsService, DocumentSmsPersistenceModule],
})
export class SmsModule {}
