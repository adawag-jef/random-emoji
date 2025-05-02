import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class BrowserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const userAgent = request.header('user-agent');
    const browserClient = userAgent?.split(' ')[0] || 'Unknown';
    request.headers.browser = browserClient;
    console.log(
      `Interceptor: manipulated request with browser ${request.headers.browser}`,
    );
    return next.handle();
  }
}
