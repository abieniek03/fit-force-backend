import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UserProfile } from '@prisma/client';
import {
  CreateUserProfileDto,
  UpdateUserProfileDto,
} from './dto/user-profile.dto';

@Injectable()
export class UserProfileService {
  constructor(private prisma: PrismaService) {}

  private async existUserProfile(userId: string): Promise<UserProfile> {
    return await this.prisma.userProfile.findFirst({
      where: {
        userId,
      },
    });
  }

  public async createUserProfile(
    userId: string,
    dto: CreateUserProfileDto,
  ): Promise<UserProfile> {
    const isExist = await this.existUserProfile(userId);

    if (isExist) throw new ConflictException('User profile already exist!');

    return await this.prisma.userProfile.create({
      data: {
        userId,
        ...dto,
      },
    });
  }

  public async getUserProfileData(userId: string): Promise<UserProfile> {
    const data = await this.existUserProfile(userId);

    if (!data) throw new NotFoundException('User profile not exist');

    return data;
  }

  public async updateUserProfile(
    userId: string,
    dto: UpdateUserProfileDto,
  ): Promise<UserProfile> {
    const data = await this.existUserProfile(userId);

    console.log(userId);
    console.log(typeof userId);
    if (!data) throw new NotFoundException('User profile not exist');

    return await this.prisma.userProfile.update({
      where: { id: data.id },
      data: {
        ...dto,
      },
    });
  }

  public async deleteUserProfile(userId: string): Promise<void> {
    const isExist = await this.existUserProfile(userId);

    if (!isExist) throw new NotFoundException('User profile not found.');

    await this.prisma.userProfile.delete({ where: { id: isExist.id } });
  }
}
