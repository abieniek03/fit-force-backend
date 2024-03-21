import { Module } from '@nestjs/common';
import { MyProgressController } from './my-progress.controller';
import { MyProgressService } from './my-progress.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [MyProgressController],
  providers: [MyProgressService, PrismaService],
})
export class MyProgressModule {}
