import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { UserData } from '../entity';

@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService) {}

  async findUser(userId: string, jwt: string): Promise<UserData> {
    const { data } = await firstValueFrom(
      this.httpService.get<UserData>(
        'http://localhost:3000/api/v1/user/' + userId,
        {
          headers: {
            Authorization: 'Bearer ' + jwt,
            accept: 'application/json',
          },
        },
      ),
    );
    return data;
  }
}
