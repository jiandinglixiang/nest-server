import { registerAs } from '@nestjs/config';

import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsString,
  ValidateIf,
  IsBoolean,
} from 'class-validator';
import validateConfig from '../../utils/validate-config';
import { DatabaseConfig } from './database-config.type';

// 定义一个用于验证环境变量的类
class EnvironmentVariablesValidator {
  // 如果存在DATABASE_URL，则验证其为字符串
  @ValidateIf((envValues) => envValues.DATABASE_URL)
  @IsString()
  DATABASE_URL: string;

  // 如果不存在DATABASE_URL，则验证DATABASE_TYPE为字符串
  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_TYPE: string;

  // 如果不存在DATABASE_URL，则验证DATABASE_HOST为字符串
  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_HOST: string;

  // 如果不存在DATABASE_URL，则验证DATABASE_PORT为整数，且在0到65535之间
  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsInt()
  @Min(0)
  @Max(65535)
  DATABASE_PORT: number;

  // 如果不存在DATABASE_URL，则验证DATABASE_PASSWORD为字符串
  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_PASSWORD: string;

  // 如果不存在DATABASE_URL，则验证DATABASE_NAME为字符串
  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_NAME: string;

  // 如果不存在DATABASE_URL，则验证DATABASE_USERNAME为字符串
  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_USERNAME: string;

  // 验证DATABASE_SYNCHRONIZE为可选的布尔值
  @IsBoolean()
  @IsOptional()
  DATABASE_SYNCHRONIZE: boolean;

  // 验证DATABASE_MAX_CONNECTIONS为可选的整数
  @IsInt()
  @IsOptional()
  DATABASE_MAX_CONNECTIONS: number;

  // 验证DATABASE_SSL_ENABLED为可选的布尔值
  @IsBoolean()
  @IsOptional()
  DATABASE_SSL_ENABLED: boolean;

  // 验证DATABASE_REJECT_UNAUTHORIZED为可选的布尔值
  @IsBoolean()
  @IsOptional()
  DATABASE_REJECT_UNAUTHORIZED: boolean;

  // 验证DATABASE_CA为可选的字符串
  @IsString()
  @IsOptional()
  DATABASE_CA: string;

  // 验证DATABASE_KEY为可选的字符串
  @IsString()
  @IsOptional()
  DATABASE_KEY: string;

  // 验证DATABASE_CERT为可选的字符串
  @IsString()
  @IsOptional()
  DATABASE_CERT: string;
}

// 注册数据库配置
export default registerAs<DatabaseConfig>('database', () => {
  // 验证环境变量配置
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    // 判断是否为文档数据库
    isDocumentDatabase: ['mongodb'].includes(process.env.DATABASE_TYPE ?? ''),
    // 返回数据库连接URL
    url: process.env.DATABASE_URL,
    // 返回数据库类型
    type: process.env.DATABASE_TYPE,
    // 返回数据库主机
    host: process.env.DATABASE_HOST,
    // 返回数据库端口，默认为5432
    port: process.env.DATABASE_PORT
      ? parseInt(process.env.DATABASE_PORT, 10)
      : 5432,
    // 返回数据库密码
    password: process.env.DATABASE_PASSWORD,
    // 返回数据库名称
    name: process.env.DATABASE_NAME,
    // 返回数据库用户名
    username: process.env.DATABASE_USERNAME,
    // 返回是否同步数据库
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    // 返回最大连接数，默认为100
    maxConnections: process.env.DATABASE_MAX_CONNECTIONS
      ? parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10)
      : 100,
    // 返回是否启用SSL
    sslEnabled: process.env.DATABASE_SSL_ENABLED === 'true',
    // 返回是否拒绝未经授权的SSL连接
    rejectUnauthorized: process.env.DATABASE_REJECT_UNAUTHORIZED === 'true',
    // 返回SSL CA证书
    ca: process.env.DATABASE_CA,
    // 返回SSL密钥
    key: process.env.DATABASE_KEY,
    // 返回SSL证书
    cert: process.env.DATABASE_CERT,
  };
});
