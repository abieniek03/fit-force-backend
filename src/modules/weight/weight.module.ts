import { Module } from '@nestjs/common';
import { WeightController } from './weight.controller';
import { WeightService } from './weight.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [WeightController],
  providers: [WeightService, PrismaService],
})
export class WeightModule {}
