import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PatientDocument = Patient & Document;

@Schema()
export class Patient {
  constructor(patient?: Partial<Patient>) {
    this.name = patient?.name;
    this.healthInsuranceCardId = patient?.healthInsuranceCardId;
    this.address = patient?.address;
    this.createdAt = patient?.createdAt;
  }

  @Prop()
  name: string;

  @Prop()
  healthInsuranceCardId: string;

  @Prop()
  address: string;

  @Prop()
  createdAt: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
