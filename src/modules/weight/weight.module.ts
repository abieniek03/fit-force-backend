import { Module } from '@nestjs/common';
import { WeightController } from './weight.controller';
import { WeightService } from './weight.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { TrainingCampService } from '../training-camp/training-camp.service';

@Module({
  controllers: [WeightController],
  providers: [WeightService, PrismaService, TrainingCampService],
})
export class WeightModule {}
