import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ImServerSchema,
  ImServerSchemaClass,
} from './entities/im-server.schema';
import { ImServerRepository } from '../im-server.repository';
import { ImServerDocumentRepository } from './repositories/im-server.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ImServerSchemaClass.name, schema: ImServerSchema },
    ]),
  ],
  providers: [
    {
      provide: ImServerRepository,
      useClass: ImServerDocumentRepository,
    },
  ],
  exports: [ImServerRepository],
})
export class DocumentImServerPersistenceModule {}
