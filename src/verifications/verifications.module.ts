import { Module } from '@nestjs/common';
import { verificationsService } from './verifications.service';
import { verificationsController } from './verifications.controller';
import { DocumentverificationPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    DocumentverificationPersistenceModule,
  ],
  controllers: [verificationsController],
  providers: [verificationsService],
  exports: [verificationsService, DocumentverificationPersistenceModule],
})
export class verificationsModule {}
