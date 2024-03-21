import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Weight as WeightModel } from '@prisma/client';
import { AddWeightDto } from './dto/weight.dto';

@Injectable()
export class WeightService {
  constructor(private prisma: PrismaService) {}

  public async addWeight(
    userId: string,
    dto: AddWeightDto,
  ): Promise<WeightModel> {
    return await this.prisma.weight.create({ data: { userId, ...dto } });
  }

  public async getAllFromCamp(campId: string): Promise<WeightModel[]> {
    return await this.prisma.weight.findMany({
      where: { campId },
    });
  }
}
