import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { LoggerService } from 'src/common';
import { UserData } from '../entity';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    private readonly logger: LoggerService,
  ) {}

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
