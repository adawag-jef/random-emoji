import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('Guard: checking authentication');
    const request: Request = context.switchToHttp().getRequest();
    const apiKey = request.header('x-api-key');
    if (apiKey !== 'SECRET') {
      console.log('Guard: failed authentication');
      return false;
    }
    console.log('Guard: passed authentication');
    return true;
  }
}
