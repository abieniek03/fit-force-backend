import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { MyParameters } from '@prisma/client';
import { CreateMyParametersDto } from './dto/my-parameters.dto';
import { UpdateBodyMeansurementDto } from '../body-meansurement/dto/body-meansurement.dto';

@Injectable()
export class MyParametersService {
  constructor(private prisma: PrismaService) {}

  private async findParameters(userId: string): Promise<MyParameters> {
    return await this.prisma.myParameters.findFirst({
      where: { userId },
    });
  }

  public async createParameters(
    userId: string,
    dto: CreateMyParametersDto,
  ): Promise<MyParameters> {
    const isExist = await this.findParameters(userId);

    if (isExist)
      throw new ConflictException('Data of this user already exist.');

    return await this.prisma.myParameters.create({
      data: {
        userId,
        ...dto,
      },
    });
  }

  public async updateParameters(
    userId: string,
    dto: UpdateBodyMeansurementDto,
  ): Promise<MyParameters> {
    const isExist = await this.findParameters(userId);

    if (!isExist) throw new NotFoundException();

    return await this.prisma.myParameters.update({
      where: {
        id: isExist.id,
      },
      data: { ...dto },
    });
  }

  public async getParameters(userId: string): Promise<MyParameters> {
    const parameters = await this.findParameters(userId);

    if (!parameters) throw new NotFoundException();

    return parameters;
  }

  public async deleteParameters(userId: string): Promise<void> {
    const isExist = await this.findParameters(userId);

    if (!isExist) throw new NotFoundException();

    await this.prisma.myParameters.delete({ where: { id: isExist.id } });
  }
}
