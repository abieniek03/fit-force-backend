import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Weight } from '@prisma/client';
import { AddWeightDto, UpdateWeightDto } from './dto/weight.dto';
import { TrainingCampService } from '../training-camp/training-camp.service';

@Injectable()
export class WeightService {
  constructor(
    private prisma: PrismaService,
    private validation: TrainingCampService,
  ) {}

  private async validateWeight(userId: string, id: string) {
    const element = await this.prisma.weight.findFirst({ where: { id } });

    if (!element) throw new NotFoundException();
    if (element.userId !== userId) throw new UnauthorizedException();
  }

  public async addWeight(userId: string, dto: AddWeightDto): Promise<Weight> {
    const isExist = await this.prisma.weight.findFirst({
      where: { date: dto.date },
    });

    if (isExist)
      throw new ConflictException(
        'Weight with this date already exist - if you want change, run patch request.',
      );

    await this.validation.validateCampDate(dto.campId, dto.date);

    return await this.prisma.weight.create({ data: { userId, ...dto } });
  }

  public async updateWeight(
    userId: string,
    id: string,
    dto: UpdateWeightDto,
  ): Promise<Weight> {
    await this.validateWeight(userId, id);
    await this.validation.validateCampDate(dto.campId, dto.date);

    return await this.prisma.weight.update({
      where: { id },
      data: dto,
    });
  }

  public async allFromCamp(
    userId: string,
    campId: string,
    sort?: string,
    limit?: string,
  ): Promise<Weight[]> {
    const data = await this.prisma.weight.findMany({
      where: { campId },
      orderBy: { date: sort ? 'desc' : 'asc' },
      take: parseInt(limit) || undefined,
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
