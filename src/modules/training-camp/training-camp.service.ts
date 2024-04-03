import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import {
  CreateTrainingCampDto,
  UpdateTrainingCampDto,
} from './dto/training-camp.dto';
import { TrainingCamp } from '@prisma/client';

@Injectable()
export class TrainingCampService {
  constructor(private prisma: PrismaService) {}

  private async trainingCampValidate(userId: string, id: string) {
    const element = await this.prisma.trainingCamp.findFirst({ where: { id } });

    if (!element) throw new NotFoundException();
    if (element.userId !== userId) throw new UnauthorizedException();
  }

  public async validateCampDate(campId: string, date: Date) {
    const { startDate, endDate } = await this.prisma.trainingCamp.findFirst({
      where: { id: campId },
    });

    if (
      new Date(startDate) > new Date(date) ||
      new Date(endDate) < new Date(date)
    ) {
      throw new ConflictException('Request date is not on schedule.');
    }
  }

  public async createTrainingCamp(
    userId: string,
    dto: CreateTrainingCampDto,
  ): Promise<TrainingCamp> {
    return this.prisma.trainingCamp.create({
      data: {
        userId,
        ...dto,
      },
    });
  }

  public async updateTrainingCamp(
    userId: string,
    id: string,
    dto: UpdateTrainingCampDto,
  ): Promise<TrainingCamp> {
    await this.trainingCampValidate(userId, id);

    return this.prisma.trainingCamp.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  public async getAllTrainingCamps(userId: string): Promise<TrainingCamp[]> {
    return await this.prisma.trainingCamp.findMany({ where: { userId } });
  }

  public async getTrainingCampById(
    userId: string,
    id: string,
  ): Promise<TrainingCamp> {
    await this.trainingCampValidate(userId, id);

    return await this.prisma.trainingCamp.findFirst({ where: { id } });
  }

  public async getLatestTrainingCamp(userId: string): Promise<TrainingCamp> {
    return await this.prisma.trainingCamp.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  public async deleteTrainingCamp(userId: string, id: string): Promise<void> {
    await this.trainingCampValidate(userId, id);
    await this.prisma.trainingCamp.delete({ where: { id } });
  }
}
