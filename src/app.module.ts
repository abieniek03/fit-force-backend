import { Module } from '@nestjs/common';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { MyProgressModule } from './modules/my-progress/my-progress.module';

@Module({
  imports: [AuthorizationModule, MyProgressModule],
})
export class AppModule {}
