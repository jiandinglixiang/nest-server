import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AllConfigType } from '../config/config.type';
import { ImServersController } from './im-servers.controller';
import { ImServersService } from './im-servers.service';
import { ImHttpService } from './infrastructure/im-http.service';
import { DocumentImServerPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

// 即时通讯服务器模块
//  第一步获取管理员tocken
//  第二步获取管理员信息
//  第三步获取管理员权限
//  第四步获取管理员权限对应的即时通讯服务器
@Module({
  imports: [
    // import modules, etc.
    DocumentImServerPersistenceModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AllConfigType>) => {
        return {
          baseURL: configService.get('imServer.openImServerApiUrl', {
            infer: true,
          }),
          transformRequest: [
            (data, headers) => {
              headers['operationID'] = Date.now().toString();
              return data;
            },
          ],
        };
      },
    }),
  ],
  controllers: [ImServersController],
  providers: [
    ImServersService,
    {
      provide: HttpService,
      useClass: ImHttpService,
    },
  ],
  exports: [ImServersService, DocumentImServerPersistenceModule, HttpService],
})
export class ImServersModule {}
