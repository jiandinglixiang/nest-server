import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PasswordSchema,
  PasswordSchemaClass,
} from './entities/password.schema';
import { PasswordRepository } from '../password.repository';
import { PasswordDocumentRepository } from './repositories/password.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PasswordSchemaClass.name, schema: PasswordSchema },
    ]),
  ],
  providers: [
    {
      provide: PasswordRepository,
      useClass: PasswordDocumentRepository,
    },
  ],
  exports: [PasswordRepository],
})
export class DocumentPasswordPersistenceModule {}
