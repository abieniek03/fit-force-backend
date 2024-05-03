import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserProfileDto {
  @ApiProperty()
  birthDate: Date;

  @ApiProperty()
  height: number;
}

export class UpdateUserProfileDto extends PartialType(CreateUserProfileDto) {}
