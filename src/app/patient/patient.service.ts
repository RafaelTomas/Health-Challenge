import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePatientRequestDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient, PatientDocument } from './entities/patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
  ) {}
  create(createPatientDto: CreatePatientRequestDto) {
    const patient = new this.patientModel(createPatientDto);
    return patient.save();
  }

  findAll() {
    return this.patientModel.find();
  }

  findOne(id: string) {
    return this.patientModel.findById(id);
  }

  update(id: string, updatePatientDto: UpdatePatientDto) {
    return this.patientModel
      .findByIdAndUpdate(
        {
          _id: id,
        },
        {
          $set: updatePatientDto,
        },
        {
          new: true,
        },
      )
      .exec();
  }

  remove(id: string) {
    return this.patientModel.deleteOne({ _id: id }).exec();
  }
}
