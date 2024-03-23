import { Module } from '@nestjs/common';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { TrainingCampModule } from './modules/training-camp/training-camp.module';
import { WeightModule } from './modules/weight/weight.module';
import { BodyMeansurementModule } from './modules/body-meansurement/body-meansurement.module';

@Module({
  imports: [
    AuthorizationModule,
    TrainingCampModule,
    WeightModule,
    BodyMeansurementModule,
  ],
})
export class AppModule {}
