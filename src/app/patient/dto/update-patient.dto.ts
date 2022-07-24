import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientRequestDto } from './create-patient.dto';

export class UpdatePatientDto extends PartialType(CreatePatientRequestDto) {}
