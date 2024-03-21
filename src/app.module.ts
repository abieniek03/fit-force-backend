import { Module } from '@nestjs/common';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { TrainingCampModule } from './modules/training-camp/training-camp.module';
import { WeightModule } from './modules/weight/weight.module';

@Module({
  imports: [AuthorizationModule, TrainingCampModule, WeightModule],
})
export class AppModule {}
