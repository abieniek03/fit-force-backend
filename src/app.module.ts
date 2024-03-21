import { Module } from '@nestjs/common';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { TrainingCampModule } from './modules/training-camp/training-camp.module';

@Module({
  imports: [AuthorizationModule, TrainingCampModule],
})
export class AppModule {}
