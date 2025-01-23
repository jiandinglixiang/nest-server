import { registerAs } from '@nestjs/config';
import { IsString, IsNotEmpty, validateSync, IsNumber } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ImServerConfig } from './config.type';

class EnvironmentVariablesValidator {
  @IsString()
  @IsNotEmpty()
  OPEN_IM_IP: string;

  @IsString()
  @IsNotEmpty()
  OPEN_IM_SERVER_API_URL: string;

  @IsString()
  @IsNotEmpty()
  OPEN_IM_SERVER_SECRET: string;

  @IsString()
  @IsNotEmpty()
  OPEN_IM_SERVER_ADMIN_USER_ID: string;

  @IsNumber()
  @IsNotEmpty()
  OPEN_IM_SERVER_API_PORT: number;

  @IsNumber()
  @IsNotEmpty()
  OPEN_IM_MSG_GATEWAY_PORT: number;
}

export default registerAs('imServer', (): ImServerConfig => {
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
    openImIp: process.env.OPEN_IM_IP!,
    openImServerApiUrl: process.env.OPEN_IM_SERVER_API_URL!,
    openImServerSecret: process.env.OPEN_IM_SERVER_SECRET!,
    openImServerAdminUserId: process.env.OPEN_IM_SERVER_ADMIN_USER_ID!,
    openImServerApiPort: Number(process.env.OPEN_IM_SERVER_API_PORT!),
    openImMsgGatewayPort: Number(process.env.OPEN_IM_MSG_GATEWAY_PORT!),
  };
});
