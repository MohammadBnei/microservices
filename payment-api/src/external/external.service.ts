import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { ProductData, UserData } from './model';
import { AxiosError } from 'axios';
import { defaultThrottleConfig } from 'rxjs/internal/operators/throttle';

@Injectable()
export class ExternalService {
  constructor(private readonly httpService: HttpService) {}

  async findUser(id: string, jwt: string): Promise<UserData> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<UserData>(process.env.USER_API_URL + 'user/' + id, {
          headers: {
            Authorization: 'Bearer ' + jwt,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            console.log({ error });
            throw 'error fetching user';
          }),
        ),
    );
    return data;
  }

  async creditUser(id: string, credit: number, jwt: string): Promise<UserData> {
    const { data } = await firstValueFrom(
      this.httpService
        .put<UserData>(
          process.env.USER_API_URL + 'user/credit/' + id,
          { credit },
          {
            headers: {
              Authorization: 'Bearer ' + jwt,
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.log({ error });
            throw 'error fetching user';
          }),
        ),
    );
    return data;
  }

  async findProduct(id: string, jwt: string): Promise<ProductData> {
    const url = new URL(process.env.PRODUCT_API_URL + 'product/');
    url.searchParams.set('id', id);
    const { data } = await firstValueFrom(
      this.httpService
        .get<ProductData>(url.toString(), {
          headers: {
            Authorization: 'Bearer ' + jwt,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            console.log({ error: error.response.data });
            throw 'error retrieving product';
          }),
        ),
    );
    return data;
  }

  async updateProduct(
    id: string,
    updateData: Partial<ProductData>,
    jwt: string,
  ): Promise<ProductData> {
    const { data } = await firstValueFrom(
      this.httpService
        .put<ProductData>(
          process.env.PRODUCT_API_URL + 'product/' + id,
          updateData,
          {
            headers: {
              Authorization: 'Bearer ' + jwt,
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.log({ error: error.response.data });
            throw 'error retrieving product';
          }),
        ),
    );
    return data;
  }
}
