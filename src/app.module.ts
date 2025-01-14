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
import smsConfig from './sms-verifications/config/sms.config';
import { SmsVerificationsModule } from './sms-verifications/sms-verifications.module';
import { CacheModule } from '@nestjs/cache-manager';
import { SmsModule } from './sms/sms.module';

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
      ttl: 1000 * 60 * 5,
      max: 100,
    }),
    infrastructureDatabaseModule,
    UsersModule,
    FilesModule,
    AuthModule,
    SessionModule,
    HomeModule,
    SmsVerificationsModule,
    SmsModule,
  ],
})
export class AppModule {}
