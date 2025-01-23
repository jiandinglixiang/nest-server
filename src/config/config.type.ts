import { AppConfig } from './app-config.type';
import { AuthConfig } from '../auth/config/auth-config.type';
import { DatabaseConfig } from '../database/config/database-config.type';
import { FileConfig } from '../files/config/file-config.type';
import { SmsConfig } from '../sms/config/config.type';
import { ImServerConfig } from '../im-servers/config/config.type';

export type AllConfigType = {
  app: AppConfig;
  auth: AuthConfig;
  database: DatabaseConfig;
  file: FileConfig;
  sms: SmsConfig;
  imServer: ImServerConfig;
};
