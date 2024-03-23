import { Module } from '@nestjs/common';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { TrainingCampModule } from './modules/training-camp/training-camp.module';
import { WeightModule } from './modules/weight/weight.module';
import { BodyMeansurementModule } from './modules/body-meansurement/body-meansurement.module';
import { MyParametersModule } from './modules/my-parameters/my-parameters.module';

@Module({
  imports: [
    AuthorizationModule,
    MyParametersModule,
    TrainingCampModule,
    WeightModule,
    BodyMeansurementModule,
  ],
})
export class AppModule {}
