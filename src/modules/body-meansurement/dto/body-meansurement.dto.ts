import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBodyMeansutementDto {
  @ApiProperty()
  date: Date;

  @ApiProperty()
  campId: string;

  @ApiProperty()
  chest: number;

  @ApiProperty()
  waist: number;

  @ApiProperty()
  belly: number;

  @ApiProperty()
  arm: number;

  @ApiProperty()
  hips: number;

  @ApiProperty()
  thigh: number;

  @ApiProperty()
  calf: number;
}

export class UpdateBodyMeansurementDto extends PartialType(
  CreateBodyMeansutementDto,
) {}
