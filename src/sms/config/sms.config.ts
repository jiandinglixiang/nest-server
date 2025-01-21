import { registerAs } from '@nestjs/config';
import { SmsConfig } from './config.type';
import { IsString, IsNotEmpty, validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

class EnvironmentVariablesValidator {
  @IsString()
  @IsNotEmpty()
  SMS_ACCESS_KEY_ID: string;

  @IsString()
  @IsNotEmpty()
  SMS_ACCESS_KEY_SECRET: string;

  @IsString()
  @IsNotEmpty()
  SMS_SIGN_NAME: string;

  @IsString()
  @IsNotEmpty()
  SMS_VERIFICATION_TEMPLATE_CODE: string;

  @IsString()
  @IsNotEmpty()
  SMS_NOTIFICATION_TEMPLATE_CODE: string;
}

export default registerAs('sms', (): SmsConfig => {
  const validatedConfig = plainToClass(
    EnvironmentVariablesValidator,
    process.env,
    { enableImplicitConversion: true },
  );

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return {
    accessKeyId: process.env.SMS_ACCESS_KEY_ID || '',
    accessKeySecret: process.env.SMS_ACCESS_KEY_SECRET || '',
    endpoint: process.env.SMS_ENDPOINT || 'dysmsapi.aliyuncs.com',
    apiVersion: process.env.SMS_API_VERSION || '2017-05-25',
    signName: process.env.SMS_SIGN_NAME || '',
    verificationTemplateCode: process.env.SMS_VERIFICATION_TEMPLATE_CODE || '',
    notificationTemplateCode: process.env.SMS_NOTIFICATION_TEMPLATE_CODE || '',
  };
});
