import { PartialType } from '@nestjs/mapped-types';

export class CreateTrainingCampDto {
  title: string;
  startDate: Date;
  endDate: Date;
}

export class UpdateTrainingCampDto extends PartialType(CreateTrainingCampDto) {
  id: string;
}
