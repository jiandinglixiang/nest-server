import { UsersModule } from '../users/users.module';
import { Module } from '@nestjs/common';
import { PasswordsService } from './passwords.service';
// import { passwordsController } from './passwords.controller';
import { DocumentPasswordPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
@Module({
  imports: [
    UsersModule,

    // import modules, etc.
    DocumentPasswordPersistenceModule,
  ],
  // controllers: [passwordsController],
  providers: [PasswordsService],
  exports: [PasswordsService, DocumentPasswordPersistenceModule],
})
export class PasswordsModule {}
