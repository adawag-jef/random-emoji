import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { LoggerService } from '../../logger.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly logger: LoggerService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.info('Guard: checking authentication');
    const request: Request = context.switchToHttp().getRequest();
    const apiKey = request.header('x-api-key');
    if (apiKey !== 'SECRET') {
      this.logger.info('Guard: failed authentication');
      return false;
    }
    this.logger.info('Guard: passed authentication');
    return true;
  }
}
