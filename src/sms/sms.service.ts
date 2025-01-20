import Core from '@alicloud/pop-core';
import { Cache } from '@nestjs/cache-manager';
import {
  HttpStatus,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendBatchSmsDto } from './dto/send-batch-sms.dto';

@Injectable()
export class SmsService {
  private readonly smsClient: any;
  private readonly logger = new Logger(SmsService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly cacheManager: Cache,
  ) {
    this.smsClient = new Core({
      accessKeyId:
        this.configService.get('sms.accessKeyId', { infer: true }) || '',
      accessKeySecret:
        this.configService.get('sms.accessKeySecret', { infer: true }) || '',
      endpoint: this.configService.get('sms.endpoint', { infer: true }) || '',
      apiVersion:
        this.configService.get('sms.apiVersion', { infer: true }) || '',
    });
  }

  // 生成验证码
  private generateVerificationCode(): string {
    return Math.random().toString().slice(2, 8);
  }

  // 发送验证码
  async sendVerificationCode(phoneNumber: string): Promise<void> {
    const code = this.generateVerificationCode();
    const params = {
      RegionId: 'cn-hangzhou',
      PhoneNumbers: phoneNumber,
      SignName: this.configService.get('sms.signName', { infer: true }),
      TemplateCode: this.configService.get('sms.verificationTemplateCode', {
        infer: true,
      }),
      TemplateParam: JSON.stringify({ code }),
    };

    try {
      const response = await this.smsClient.request('SendSms', params, {
        method: 'POST',
      });
      console.log(response);
      // 将验证码存入缓存，设置5分钟过期
      await this.cacheManager.set(
        `sms:verification:${phoneNumber}`,
        code,
        300000,
      );

      // await this.smsRepository.create({
      //   phoneNumbers: [phoneNumber],
      //   templateCode: params.TemplateCode,
      //   templateParam: { code },
      //   signName: params.SignName,
      //   status: 'sent',
      //   bizId: response.BizId,
      //   requestId: response.RequestId,
      // });
    } catch (error) {
      this.logger.error('发送验证码失败', error);
      // await this.smsRepository.create({
      //   phoneNumbers: [phoneNumber],
      //   templateCode: params.TemplateCode,
      //   templateParam: { code },
      //   signName: params.SignName,
      //   status: 'failed',
      //   message: error.message,
      // });
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          phone: '发送失败',
          error: error.message,
        },
      });
    }
  }

  // 验证验证码
  async verifyCode(phoneNumber: string, code: string): Promise<boolean> {
    const cachedCode = await this.cacheManager.get<string>(
      `sms:verification:${phoneNumber}`,
    );

    if (!cachedCode) {
      return false;
    }

    const isValid = cachedCode === code;

    if (isValid) {
      // 验证成功后删除验证码
      await this.cacheManager.del(`sms:verification:${phoneNumber}`);
    }

    return isValid;
  }

  // 原有的批量发送通知短信方法
  async sendBatchNotification(dto: SendBatchSmsDto): Promise<void> {
    const params = {
      RegionId: 'cn-hangzhou',
      PhoneNumberJson: JSON.stringify(dto.phoneNumbers),
      SignNameJson: JSON.stringify(
        new Array(dto.phoneNumbers.length).fill(
          this.configService.get('sms.signName', { infer: true }),
        ),
      ),
      TemplateCode: this.configService.get('sms.notificationTemplateCode', {
        infer: true,
      }),
      TemplateParamJson: JSON.stringify(
        new Array(dto.phoneNumbers.length).fill(dto.templateParam),
      ),
    };

    try {
      const response = await this.smsClient.request('SendBatchSms', params, {
        method: 'POST',
      });
      console.log(response);
      // await this.smsRepository.create({
      //   phoneNumbers: dto.phoneNumbers,
      //   templateCode: params.TemplateCode,
      //   templateParam: dto.templateParam,
      //   signName: this.configService.get('sms.signName', { infer: true }),
      //   status: 'sent',
      //   bizId: response.BizId,
      //   requestId: response.RequestId,
      // });
    } catch (error) {
      this.logger.error('发送批量短信失败', error);
      // await this.smsRepository.create({
      //   phoneNumbers: dto.phoneNumbers,
      //   templateCode: params.TemplateCode,
      //   templateParam: dto.templateParam,
      //   signName: this.configService.get('sms.signName', { infer: true }),
      //   status: 'failed',
      //   message: error.message,
      // });
      throw error;
    }
  }

  // 其他方法...
}
