import { Module } from '@nestjs/common';
import { TrainingCampService } from './training-camp.service';
import { TrainingCampController } from './training-camp.controller';
import { PrismaService } from '../../../prisma/prisma.service';

@Module({
  controllers: [TrainingCampController],
  providers: [TrainingCampService, PrismaService],
})
export class TrainingCampModule {}
