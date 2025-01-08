import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  verificationSchema,
  verificationSchemaClass,
} from './entities-实体数据模型/verification.schema';
import { verificationRepository } from '../verification.repository';
import { verificationDocumentRepository } from './repositories-仓库操作/verification.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: verificationSchemaClass.name, schema: verificationSchema },
    ]),
  ],
  providers: [
    {
      provide: verificationRepository,
      useClass: verificationDocumentRepository,
    },
  ],
  exports: [verificationRepository],
})
export class DocumentverificationPersistenceModule {}
