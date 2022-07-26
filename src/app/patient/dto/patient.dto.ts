import { ApiResponseProperty } from '@nestjs/swagger';

export class PatientResponseDto {
  @ApiResponseProperty()
  _id: string;

  @ApiResponseProperty()
  name: string;

  @ApiResponseProperty()
  healthInsuranceCardId: string;

  @ApiResponseProperty()
  address: string;

  @ApiResponseProperty()
  createdAt: string;
}
