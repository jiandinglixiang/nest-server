import { Module } from '@nestjs/common';
import { PasswordsService } from './passwords.service';
// import { passwordsController } from './passwords.controller';
import { DocumentPasswordPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

const infrastructurePersistenceModule = DocumentPasswordPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule],
  // controllers: [passwordsController],
  providers: [PasswordsService],
  exports: [PasswordsService, infrastructurePersistenceModule],
})
export class PasswordsModule {}
