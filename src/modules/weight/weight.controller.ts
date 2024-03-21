import { Controller, Post, Headers, Body, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddWeightDto } from './dto/weight.dto';
import { WeightService } from './weight.service';

@ApiTags('Weight')
@Controller('weight')
export class WeightController {
  constructor(private readonly weightService: WeightService) {}

  @Post()
  async addWeight(
    @Headers('user-id') userId: string,
    @Body() dto: AddWeightDto,
  ) {
    return await this.weightService.addWeight(userId, dto);
  }

  @Get(`:camp`)
  async getAllWeights(@Param('camp') campId: string) {
    return await this.weightService.getAllFromCamp(campId);
  }
}
