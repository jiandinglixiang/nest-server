import Core from '@alicloud/pop-core';
import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendSmsVerificationDto } from './dto/send-sms-verification.dto';
import { SmsVerificationDto } from './dto/sms-verification.dto';
import { SmsVerificationRepository } from './infrastructure/persistence/sms-verification.repository';

@Injectable()
export class SmsVerificationsService {
  private readonly smsClient: any;

  constructor(
    private readonly configService: ConfigService,
    private readonly smsVerificationRepository: SmsVerificationRepository,
  ) {
    // 初始化阿里云SMS客户端
    this.smsClient = new Core({
      accessKeyId: this.configService.get('sms.accessKeyId', { infer: true })!,
      accessKeySecret: this.configService.get('sms.accessKeySecret', {
        infer: true,
      })!,
      endpoint: this.configService.get('sms.endpoint', { infer: true })!,
      apiVersion: this.configService.get('sms.apiVersion', { infer: true })!,
    });
  }

  async sendVerificationCode(
    sendSmsVerificationDto: SendSmsVerificationDto,
  ): Promise<void> {
    // 生成6位随机验证码
    const code = Math.random().toString().slice(2, 8);

    // 设置验证码有效期为5分钟
    const expiredAt = new Date(Date.now() + 5 * 60 * 1000);

    // 保存验证码记录
    const verification = await this.smsVerificationRepository.create({
      phoneNumber: sendSmsVerificationDto.phoneNumber,
      code,
      expiredAt,
      isUsed: false,
    });

    // 调用阿里云SMS发送验证码
    const params = {
      RegionId: 'cn-hangzhou',
      PhoneNumbers: sendSmsVerificationDto.phoneNumber,
      SignName: this.configService.get('sms.signName', { infer: true })!,
      TemplateCode: this.configService.get('sms.templateCode', {
        infer: true,
      })!,
      TemplateParam: JSON.stringify({ code }),
    };

    try {
      await this.smsClient.request('SendSms', params, { method: 'POST' });
    } catch (error) {
      // 发送失败时删除验证码记录
      await this.smsVerificationRepository.remove(verification.id);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          phone: '发送失败',
          error,
        },
      });
    }
  }

  async verifyCode(smsVerificationDto: SmsVerificationDto): Promise<boolean> {
    const verification =
      await this.smsVerificationRepository.findOne(smsVerificationDto);

    if (!verification) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          code: '不存在或已使用',
        },
      });
    }

    if (new Date() > verification.expiredAt) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          code: '已过期',
        },
      });
    }

    // 标记验证码为已使用
    await this.smsVerificationRepository.update(verification.id, {
      isUsed: true,
    });

    return true;
  }
}
