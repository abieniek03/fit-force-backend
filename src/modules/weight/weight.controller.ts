import {
  Controller,
  Post,
  Headers,
  Body,
  Get,
  Param,
  Query,
  Delete,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddWeightDto, UpdateWeightDto } from './dto/weight.dto';
import { WeightService } from './weight.service';
import { Weight as WeightModel } from '@prisma/client';

@ApiTags('Weight')
@Controller('weight')
export class WeightController {
  constructor(private readonly weightService: WeightService) {}

  @Post()
  async addWeight(
    @Headers('user-id') userId: string,
    @Body() dto: AddWeightDto,
  ): Promise<WeightModel> {
    return await this.weightService.addWeight(userId, dto);
  }

  @Patch(':id')
  async updateWeight(
    @Headers('user-id') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateWeightDto,
  ): Promise<WeightModel> {
    return await this.weightService.updateWeight(userId, id, dto);
  }

  @Get('camp-id=:id')
  async getAllWeights(
    @Headers('user-id') userId: string,
    @Param('id') campId: string,
    @Query('sort') sort?: string,
  ): Promise<WeightModel[]> {
    return await this.weightService.allFromCamp(userId, campId, sort);
  }

  @Get('bmi')
  async getWeightToCalculateBmi(
    @Headers('user-id') userId: string,
  ): Promise<WeightModel> {
    return await this.weightService.weightToCalculateBmi(userId);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteWeight(
    @Headers('user-id') userId: string,
    @Param('id') id: string,
  ): Promise<void> {
    await this.weightService.deleteWeight(userId, id);
  }
}
