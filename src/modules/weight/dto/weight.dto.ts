import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class AddWeightDto {
  @ApiProperty()
  campId: string;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  date: Date;
}

export class UpdateWeightDto extends PartialType(AddWeightDto) {}
