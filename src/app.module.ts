import { Module } from '@nestjs/common';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { MyProgressModule } from './modules/training-camp/training-camp.module';

@Module({
  imports: [AuthorizationModule, MyProgressModule],
})
export class AppModule {}
