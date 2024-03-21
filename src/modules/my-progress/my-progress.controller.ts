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
import { MyProgressService } from './my-progress.service';
import {
  CreateTrainingCampDto,
  UpdateTrainingCampDto,
} from './dto/my-progress.dto';
import { TrainingCamp as TrainingCampModel } from '@prisma/client';

@Controller('my-progress')
export class MyProgressController {
  constructor(private readonly myProgressService: MyProgressService) {}

  @Post('training-camp')
  async createTrainingCamp(
    @Headers('user-id') userId: string,
    @Body() dto: CreateTrainingCampDto,
  ): Promise<TrainingCampModel> {
    return await this.myProgressService.createTrainingCamp(userId, dto);
  }

  @Patch('training-camp')
  async uppdateTrainingCamp(
    @Headers('user-id') userId: string,
    @Body() dto: UpdateTrainingCampDto,
  ): Promise<TrainingCampModel> {
    return await this.myProgressService.updateTrainingCamp(userId, dto);
  }

  @Get('training-camp/:id')
  async getTrainingCamp(
    @Headers('user-id') userId: string,
    @Param('id') id: string,
  ): Promise<TrainingCampModel> {
    return await this.myProgressService.getTrainingCamp(userId, id);
  }

  @Delete('training-camp/:id')
  @HttpCode(204)
  async deleteTrainingCamp(
    @Headers('user-id') userId: string,
    @Param('id') id: string,
  ): Promise<void> {
    await this.myProgressService.deleteTrainingCamp(userId, id);
  }
}
