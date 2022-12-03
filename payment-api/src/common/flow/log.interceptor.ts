import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { WinstonLogger } from '../provider';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  public constructor(private readonly logger: WinstonLogger) {}

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response> {
    const startTime = new Date().getTime();
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => {
        const responseStatus =
          request.method === 'POST' ? HttpStatus.CREATED : HttpStatus.OK;
        this.logger.log(
          `[${this.getTimeDelta(startTime)}ms] ${
            request.ip
          } ${responseStatus} ${request.method} ${request.originalUrl}`,
        );
        return data;
      }),
      catchError((err) => {
        // Log fomat inspired by the Squid docs
        // See https://docs.trafficserver.apache.org/en/6.1.x/admin-guide/monitoring/logging/log-formats.en.html
        this.logger.error(
          `${this.getTimeDelta(startTime)}ms ${request.ip} ${err.status} ${
            request.method
          } ${this.getUrl(request)}`,
        );
        return throwError(() => err);
      }),
    );
  }

  private getTimeDelta(startTime: number): number {
    return new Date().getTime() - startTime;
  }

  private getUrl(request: Request): string {
    return `${request.protocol}://${request.get('host')}${request.originalUrl}`;
  }
}
