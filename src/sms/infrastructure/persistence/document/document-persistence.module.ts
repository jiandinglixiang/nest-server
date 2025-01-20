import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SmsSchema, SmsSchemaClass } from './entities/sms.schema';
import { SmsRepository } from '../sms.repository';
import { SmsDocumentRepository } from './repositories/sms.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SmsSchemaClass.name, schema: SmsSchema },
    ]),
  ],
  providers: [
    {
      provide: SmsRepository,
      useClass: SmsDocumentRepository,
    },
  ],
  exports: [SmsRepository],
})
export class DocumentSmsPersistenceModule {}
