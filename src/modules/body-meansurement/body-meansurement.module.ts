import { Module } from '@nestjs/common';
import { BodyMeansurementController } from './body-meansurement.controller';
import { BodyMeansurementService } from './body-meansurement.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { TrainingCampService } from '../training-camp/training-camp.service';

@Module({
  controllers: [BodyMeansurementController],
  providers: [BodyMeansurementService, PrismaService, TrainingCampService],
})
export class BodyMeansurementModule {}
