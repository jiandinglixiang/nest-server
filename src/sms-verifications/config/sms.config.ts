import { registerAs } from '@nestjs/config';

import validateConfig from '../../utils/validate-config';
import { IsOptional, IsString } from 'class-validator';

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  SMS_ACCESS_KEY_ID: string;

  @IsString()
  @IsOptional()
  SMS_ACCESS_KEY_SECRET: string;

  @IsString()
  @IsOptional()
  SMS_ENDPOINT: string;

  @IsString()
  @IsOptional()
  SMS_API_VERSION: string;

  @IsString()
  @IsOptional()
  SMS_SIGN_NAME: string;

  @IsString()
  @IsOptional()
  SMS_TEMPLATE_CODE: string;
}

export default registerAs('sms', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    accessKeyId: process.env.SMS_ACCESS_KEY_ID,
    accessKeySecret: process.env.SMS_ACCESS_KEY_SECRET,
    endpoint: process.env.SMS_ENDPOINT,
    apiVersion: process.env.SMS_API_VERSION,
    signName: process.env.SMS_SIGN_NAME,
    templateCode: process.env.SMS_TEMPLATE_CODE,
  };
});
