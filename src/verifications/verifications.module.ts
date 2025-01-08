import { Module } from '@nestjs/common';
import { verificationsService } from './verifications.service';
import { verificationsController } from './verifications.controller';
import { DocumentverificationPersistenceModule } from './infrastructure-基础设施/persistence-持久化/document-文档数据模型/document-persistence.module';

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
