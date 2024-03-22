import { ApiProperty } from '@nestjs/swagger';

export class AddWeightDto {
  @ApiProperty()
  campId: string;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  date: Date;
}
