import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type PatientDocument = Patient & Document;

@Schema()
export class Patient {
  @Prop()
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  healthInsuranceCardId: number;

  @Prop()
  @ApiProperty()
  address: string;

  @Prop()
  @ApiProperty()
  createdAt: string;

  constructor(patient?: Partial<Patient>) {
    this.name = patient?.name;
    this.healthInsuranceCardId = patient?.healthInsuranceCardId;
    this.address = patient?.address;
    this.createdAt = patient?.createdAt;
  }
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
