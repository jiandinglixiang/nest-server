import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UserSchemaClass } from './entities/user.schema';
import {
  PasswordSchema,
  PasswordSchemaClass,
} from './entities/password.schema';
import { UserRepository } from '../user.repository';
import { UsersDocumentRepository } from './repositories/user.repository';
import { PasswordRepository } from '../password.repository';
import { PasswordDocumentRepository } from './repositories/password.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSchemaClass.name, schema: UserSchema },
      { name: PasswordSchemaClass.name, schema: PasswordSchema },
    ]),
  ],
  providers: [
    {
      provide: UserRepository,
      useClass: UsersDocumentRepository,
    },
    {
      provide: PasswordRepository,
      useClass: PasswordDocumentRepository,
    },
  ],
  exports: [UserRepository, PasswordRepository],
})
export class DocumentUserPersistenceModule {}
