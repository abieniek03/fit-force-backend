import {
  Controller,
  Post,
  Headers,
  Body,
  Patch,
  Param,
  Get,
  Delete,
  HttpCode,
} from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BodyMeansurementService } from './body-meansurement.service';
import { BodyMeansurement as BodyMeansurementModel } from '@prisma/client';
import {
  CreateBodyMeansutementDto,
  UpdateBodyMeansurementDto,
} from './dto/body-meansurement.dto';

@ApiTags('Body meansurement')
@Controller('body-meansurement')
export class BodyMeansurementController {
  constructor(
    private readonly bodyMeansurementService: BodyMeansurementService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new' })
  async create(
    @Headers('user-id') userId: string,
    @Body() dto: CreateBodyMeansutementDto,
  ): Promise<BodyMeansurementModel> {
    return await this.bodyMeansurementService.addBodyMeansurement(userId, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update' })
  async update(
    @Headers('user-id') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateBodyMeansurementDto,
  ): Promise<BodyMeansurementModel> {
    return await this.bodyMeansurementService.updateBodyMeansurement(
      userId,
      id,
      dto,
    );
  }

  @Get('camp-id=:id')
  @ApiOperation({ summary: 'Get by id' })
  async getAll(
    @Headers('user-id') userId: string,
    @Param('id') id: string,
  ): Promise<BodyMeansurementModel[]> {
    return await this.bodyMeansurementService.getAll(userId, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete by id' })
  @HttpCode(204)
  async delete(
    @Headers('user-id') userId: string,
    @Param('id') id: string,
  ): Promise<void> {
    return await this.bodyMeansurementService.delete(userId, id);
  }
}
