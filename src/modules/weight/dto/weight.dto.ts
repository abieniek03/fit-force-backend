import { ApiProperty } from '@nestjs/swagger';

export class AddWeightDto {
  @ApiProperty()
  trainingCampId: string;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  date: Date;
}
