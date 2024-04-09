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
  Query,
} from '@nestjs/common';
import { TrainingCampService } from './training-camp.service';
import {
  CreateTrainingCampDto,
  UpdateTrainingCampDto,
} from './dto/training-camp.dto';
import { TrainingCamp as TrainingCampModel } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Training camp')
@Controller('training-camp')
export class TrainingCampController {
  constructor(private readonly trainingCampService: TrainingCampService) {}

  @Post()
  @ApiOperation({ summary: 'Create new' })
  async createTrainingCamp(
    @Headers('user-id') userId: string,
    @Body() dto: CreateTrainingCampDto,
  ): Promise<TrainingCampModel> {
    return await this.trainingCampService.createTrainingCamp(userId, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update' })
  async updateTrainingCamp(
    @Headers('user-id') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateTrainingCampDto,
  ): Promise<TrainingCampModel> {
    return await this.trainingCampService.updateTrainingCamp(userId, id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all or latest' })
  async getTrainingCamps(
    @Headers('user-id') userId: string,
    @Query('latest') latest?: string,
  ): Promise<TrainingCampModel | TrainingCampModel[]> {
    if (latest === 'true')
      return await this.trainingCampService.getLatestTrainingCamp(userId);

    return await this.trainingCampService.getAllTrainingCamps(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get by id' })
  async getTrainingCamp(
    @Headers('user-id') userId: string,
    @Param('id') id: string,
  ): Promise<TrainingCampModel> {
    return await this.trainingCampService.getTrainingCampById(userId, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete by id' })
  @HttpCode(204)
  async deleteTrainingCamp(
    @Headers('user-id') userId: string,
    @Param('id') id: string,
  ): Promise<void> {
    await this.trainingCampService.deleteTrainingCamp(userId, id);
  }
}
