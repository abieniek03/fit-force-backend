import { Module } from '@nestjs/common';
import { MyParametersController } from './my-parameters.controller';
import { MyParametersService } from './my-parameters.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [MyParametersController],
  providers: [MyParametersService, PrismaService],
})
export class MyParametersModule {}
