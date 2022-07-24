import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
export class CreatePatientRequestDto {
  @ApiProperty({
    example: 'Matilde Fernandes Gonçalves',
    description: 'Patient name',
  })
  name: string;

  @ApiProperty({
    example: '123465789',
    description: 'Patient health Insurance Card Id',
  })
  healthInsuranceCardId: string;

  @ApiProperty({
    example: 'Rua Luís de Castro, 1182',
    description: 'Patient address',
  })
  address: string;

  @ApiProperty({
    example: '2022-05-05',
    description: 'When it was created in the patient list',
  })
  createdAt: string;
}

export class CreatePatientResponseDto {
  @ApiResponseProperty()
  name: string;

  @ApiResponseProperty()
  healthInsuranceCardId: string;

  @ApiResponseProperty()
  address: string;

  @ApiResponseProperty()
  createdAt: string;
}
