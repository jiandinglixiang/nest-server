import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './database/config/database.config';
import authConfig from './auth/config/auth.config';
import appConfig from './config/app.config';
import fileConfig from './files/config/file.config';
import { ConfigModule } from '@nestjs/config';
import { HomeModule } from './home/home.module';
import { SessionModule } from './session/session.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './database/mongoose-config.service';

const infrastructureDatabaseModule = MongooseModule.forRootAsync({
  useClass: MongooseConfigService,
});

import { verificationsModule } from './verifications/verifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, appConfig, fileConfig],
      envFilePath: ['.env'],
    }),
    infrastructureDatabaseModule,
    verificationsModule,
    UsersModule,
    FilesModule,
    AuthModule,
    SessionModule,
    HomeModule,
  ],
})
export class AppModule {}
