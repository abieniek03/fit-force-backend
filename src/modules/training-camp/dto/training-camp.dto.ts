import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrainingCampDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  startDate: Date;
  @ApiProperty()
  endDate: Date;
}

export class UpdateTrainingCampDto extends PartialType(CreateTrainingCampDto) {
  id: string;
}
