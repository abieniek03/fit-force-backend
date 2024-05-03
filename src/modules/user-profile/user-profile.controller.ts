import {
  Body,
  Controller,
  Post,
  Headers,
  Get,
  Patch,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserProfileService } from './user-profile.service';
import {
  CreateUserProfileDto,
  UpdateUserProfileDto,
} from './dto/user-profile.dto';
import { UserProfile as UserProfileModel } from '@prisma/client';

@ApiTags('User profile')
@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Post()
  @ApiOperation({ summary: 'Create' })
  async createUserProfile(
    @Headers('user-id') userId: string,
    @Body() dto: CreateUserProfileDto,
  ): Promise<UserProfileModel> {
    return await this.userProfileService.createUserProfile(userId, dto);
  }

  @Patch()
  @ApiOperation({ summary: 'Create' })
  async updateUserProfile(
    @Headers('user-id') userId: string,
    @Body() dto: UpdateUserProfileDto,
  ): Promise<UserProfileModel> {
    return await this.userProfileService.updateUserProfile(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get data' })
  async getUserProfileData(
    @Headers('user-id') userId: string,
  ): Promise<UserProfileModel> {
    return await this.userProfileService.getUserProfileData(userId);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete' })
  @HttpCode(204)
  async deleteUserProfile(@Headers('user-id') userId: string): Promise<any> {
    await this.userProfileService.deleteUserProfile(userId);
  }
}
