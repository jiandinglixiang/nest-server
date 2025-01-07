import { Module } from '@nestjs/common';

import { DocumentSessionPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { SessionService } from './session.service';

const infrastructurePersistenceModule = DocumentSessionPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule],
  providers: [SessionService],
  exports: [SessionService, infrastructurePersistenceModule],
})
export class SessionModule {}
// SessionModule用于管理会话相关的功能，包括会话的持久化和服务提供。
