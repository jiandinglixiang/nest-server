import { HttpModuleOptions, HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { AllConfigType } from '../../config/config.type';

type GetUserTokenResponse = {
  errCode: 0 | number;
  errMsg: string;
  errDlt: string;
  data: {
    token: string;
    expireTimeSeconds: number;
  };
};
@Injectable()
export class ImHttpService extends HttpService {
  constructor(
    // Dependencies here
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService<AllConfigType>,
  ) {
    super();
    console.log(this);
    this.axiosRef.interceptors.request.use((config) => {
      // const token = await this.getToken();
      console.log(config);
      config.headers['token'] = '123';
      return config;
    });
  }

  // private async getToken(): Promise<GetUserTokenResponse['data']> {
  //   const imToken = await this.cacheManager.get('im-token');
  //   if (!imToken) {
  //     const imServerConfig = this.configService.get('imServer', {
  //       infer: true,
  //     })!;

  //     const { data } = await firstValueFrom(
  //       this.httpService.post<GetUserTokenResponse>(`/auth/get_user_token`, {
  //         secret: imServerConfig.openImServerSecret,
  //         userID: imServerConfig.openImServerAdminUserId,
  //       }),
  //     );
  //     console.log(data);
  //     await this.cacheManager.set('im-token', data.data);
  //   }
  //   return imToken as GetUserTokenResponse['data'];
  // }
}
