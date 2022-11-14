import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { configProvider } from 'src/common';
import { UserData } from '../model';

@Injectable()
export class UserService {
  configService;
  constructor(private readonly httpService: HttpService) {
    this.configService = configProvider.useFactory();
  }

  async findUser(userId: string, jwt: string): Promise<UserData> {
    return this.httpService.axiosRef.get(
      this.configService.USER_API_URL + 'user/' + userId,
      {
        headers: {
          Authorization: 'Bearer ' + jwt,
        },
      },
    );
  }
}
