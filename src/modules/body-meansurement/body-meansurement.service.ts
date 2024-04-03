import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BodyMeansurement } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import {
  CreateBodyMeansutementDto,
  UpdateBodyMeansurementDto,
} from './dto/body-meansurement.dto';
import { TrainingCampService } from '../training-camp/training-camp.service';

@Injectable()
export class BodyMeansurementService {
  constructor(
    private prisma: PrismaService,
    private validation: TrainingCampService,
  ) {}

  private async validateBodyMeansurement(userId: string, id: string) {
    const element = await this.prisma.bodyMeansurement.findFirst({
      where: { id },
    });

    if (!element) throw new NotFoundException();
    if (element.userId !== userId) throw new UnauthorizedException();
  }

  public async addBodyMeansurement(
    userId: string,
    dto: CreateBodyMeansutementDto,
  ): Promise<BodyMeansurement> {
    const isExist = await this.prisma.weight.findFirst({
      where: { date: dto.date },
    });

    if (isExist)
      throw new ConflictException(
        'Data with this date already exist - if you want change, run patch request.',
      );

    await this.validation.validateCampDate(dto.campId, dto.date);

    return await this.prisma.bodyMeansurement.create({
      data: {
        userId,
        ...dto,
      },
    });
  }

  public async updateBodyMeansurement(
    userId: string,
    id: string,
    dto: UpdateBodyMeansurementDto,
  ): Promise<BodyMeansurement> {
    await this.validateBodyMeansurement(userId, id);
    await this.validation.validateCampDate(dto.campId, dto.date);

    return await this.prisma.bodyMeansurement.update({
      where: { id },
      data: { ...dto },
    });
  }

  public async getAll(
    userId: string,
    campId: string,
  ): Promise<BodyMeansurement[]> {
    const data = await this.prisma.bodyMeansurement.findMany({
      where: { campId },
    });

    const unauthorizedData = data.filter((el) => el.userId !== userId);
    if (unauthorizedData.length) throw new UnauthorizedException();

    return data;
  }

  public async delete(userId: string, id: string): Promise<void> {
    await this.validateBodyMeansurement(userId, id);
    await this.prisma.bodyMeansurement.delete({ where: { id } });
  }
}
