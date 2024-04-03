import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { decodeJwt } from '@clerk/clerk-sdk-node';

@Injectable()
export class ClerkAuthorizationGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new BadRequestException('Bearer token is required!');
    }

    const token = authorizationHeader.split(' ')[1];

    try {
      const { payload } = decodeJwt(token);
      request.headers['user-id'] = payload.sub;

      return true;
    } catch (error) {
      console.error('Unauthorized error:', error);
      throw new UnauthorizedException('User does not authorized.');
    }
  }
}
