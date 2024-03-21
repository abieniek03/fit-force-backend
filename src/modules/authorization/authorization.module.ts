import { Module } from '@nestjs/common';
import { ClerkAuthorizationGuard } from './clerk-authorization.guard';

@Module({
  providers: [ClerkAuthorizationGuard],
  exports: [ClerkAuthorizationGuard],
})
export class AuthorizationModule {}
