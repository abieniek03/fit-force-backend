import {
  Controller,
  Post,
  Headers,
  Body,
  Patch,
  Delete,
  HttpCode,
  Param,
  Get,
} from '@nestjs/common';
import { TrainingCampService } from './training-camp.service';
import {
  CreateTrainingCampDto,
  UpdateTrainingCampDto,
} from './dto/training-camp.dto';
import { TrainingCamp as TrainingCampModel } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Training camp')
@Controller('training-camp')
export class TrainingCampController {
  constructor(private readonly trainingCampService: TrainingCampService) {}

  @Post()
  async createTrainingCamp(
    @Headers('user-id') userId: string,
    @Body() dto: CreateTrainingCampDto,
  ): Promise<TrainingCampModel> {
    return await this.trainingCampService.createTrainingCamp(userId, dto);
  }

  @Patch()
  async updateTrainingCamp(
    @Headers('user-id') userId: string,
    @Body() dto: UpdateTrainingCampDto,
  ): Promise<TrainingCampModel> {
    return await this.trainingCampService.updateTrainingCamp(userId, dto);
  }

  @Get(':id')
  async getTrainingCamp(
    @Headers('user-id') userId: string,
    @Param('id') id: string,
  ): Promise<TrainingCampModel> {
    return await this.trainingCampService.getTrainingCamp(userId, id);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrainingCamp(
    @Headers('user-id') userId: string,
    @Param('id') id: string,
  ): Promise<void> {
    await this.trainingCampService.deleteTrainingCamp(userId, id);
  }
}
