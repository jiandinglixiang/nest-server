import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DocumentUserPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    DocumentUserPersistenceModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, DocumentUserPersistenceModule],
})
export class UsersModule {}
