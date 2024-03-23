import { ApiProperty } from '@nestjs/swagger';
import { SEX } from '@prisma/client';

export class CreateMyParametersDto {
  @ApiProperty()
  sex: SEX;

  @ApiProperty()
  birthDate: Date;

  @ApiProperty()
  height: number;
}
