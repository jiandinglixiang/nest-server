import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import authConfig from './auth/config/auth.config';
import appConfig from './config/app.config';
import databaseConfig from './database/config/database.config';
import { MongooseConfigService } from './database/mongoose-config.service';
import fileConfig from './files/config/file.config';
import { FilesModule } from './files/files.module';
import { HomeModule } from './home/home.module';
import { SessionModule } from './session/session.module';
import { SmsModule } from './sms/sms.module';
import { UsersModule } from './users/users.module';
import smsConfig from './sms/config/sms.config';

const infrastructureDatabaseModule = MongooseModule.forRootAsync({
  useClass: MongooseConfigService,
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, appConfig, fileConfig, smsConfig],
      envFilePath: ['.env'],
    }),
    CacheModule.register({
      global: true,
      ttl: 1000 * 60 * 5,
      max: 100,
    }),
    SmsModule,
    infrastructureDatabaseModule,
    AuthModule,
    UsersModule,
    FilesModule,
    SessionModule,
    HomeModule,
  ],
})
export class AppModule {}
