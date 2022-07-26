import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePatientRequestDto {
  @ApiProperty({
    example: 'Matilde Fernandes Gonçalves',
    description: 'Patient name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '123465789',
    description: 'Patient health Insurance Card Id',
  })
  @IsString()
  healthInsuranceCardId: string;

  @ApiProperty({
    example: 'Rua Luís de Castro, 1182',
    description: 'Patient address',
  })
  @IsString()
  address: string;

  @ApiProperty({
    example: '2022-05-05',
    description: 'When it was created in the patient list',
  })
  @IsString()
  @IsNotEmpty()
  createdAt: string;
}

export class CreatePatientResponseDto {
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
