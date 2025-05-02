import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const switchToHttp = host.switchToHttp();
    const request = switchToHttp.getRequest<Request>();
    const response = switchToHttp.getResponse<Response>();
    const isHttpException = exception instanceof HttpException;
    const statusCode = isHttpException ? exception.getStatus() : 500;
    response.status(statusCode);
    response.json({
      message: isHttpException ? exception.message : 'Internal Server Error',
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      trackingId: crypto.randomUUID(),
    });
  }
}
