import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Weight } from '@prisma/client';
import { AddWeightDto, UpdateWeightDto } from './dto/weight.dto';

@Injectable()
export class WeightService {
  constructor(private prisma: PrismaService) {}

  private async validateWeight(userId: string, id: string) {
    const element = await this.prisma.weight.findFirst({ where: { id } });

    if (!element) throw new NotFoundException();
    if (element.userId !== userId) throw new UnauthorizedException();
  }

  public async addWeight(userId: string, dto: AddWeightDto): Promise<Weight> {
    return await this.prisma.weight.create({ data: { userId, ...dto } });
  }

  public async updateWeight(
    userId: string,
    id: string,
    dto: UpdateWeightDto,
  ): Promise<Weight> {
    await this.validateWeight(userId, id);

    return await this.prisma.weight.update({
      where: { id },
      data: dto,
    });
  }

  public async allFromCamp(
    userId: string,
    campId: string,
    sort?: string,
  ): Promise<Weight[]> {
    const data = await this.prisma.weight.findMany({
      where: { campId },
      orderBy: { date: sort ? 'desc' : 'asc' },
    });

    const unauthorizedData = data.filter((el) => el.userId !== userId);
    if (unauthorizedData.length) throw new UnauthorizedException();

    return data;
  }

  public async weightToCalculateBmi(userId: string): Promise<Weight> {
    return await this.prisma.weight.findFirst({
      where: { userId },
      orderBy: { date: 'desc' },
    });
  }

  public async deleteWeight(userId: string, id: string): Promise<void> {
    await this.validateWeight(userId, id);
    await this.prisma.weight.delete({ where: { id } });
  }
}
