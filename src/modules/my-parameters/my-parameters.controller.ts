import {
  Controller,
  Post,
  Headers,
  Body,
  Get,
  Delete,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { MyParametersService } from './my-parameters.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MyParameters as MyParametersModel } from '@prisma/client';
import { CreateMyParametersDto } from './dto/my-parameters.dto';
import { UpdateBodyMeansurementDto } from '../body-meansurement/dto/body-meansurement.dto';

@ApiTags('My parameters')
@Controller('my-parameters')
export class MyParametersController {
  constructor(private readonly myParametersService: MyParametersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user parameters' })
  async createParameters(
    @Headers('user-id') userId: string,
    @Body() dto: CreateMyParametersDto,
  ): Promise<MyParametersModel> {
    return await this.myParametersService.createParameters(userId, dto);
  }

  @Patch()
  @ApiOperation({ summary: 'Update user parameters' })
  async updateParameters(
    @Headers('user-id') userId: string,
    @Body() dto: UpdateBodyMeansurementDto,
  ): Promise<MyParametersModel> {
    return await this.myParametersService.updateParameters(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get user parameters' })
  async getUserParameters(
    @Headers('user-id') userId: string,
  ): Promise<MyParametersModel> {
    return await this.myParametersService.getParameters(userId);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete user parameters' })
  @HttpCode(204)
  async deleteUserParameters(
    @Headers('user-id') userId: string,
  ): Promise<void> {
    await this.myParametersService.deleteParameters(userId);
  }
}
