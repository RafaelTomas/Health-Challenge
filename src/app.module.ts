import { Module } from '@nestjs/common';
import { PatientModule } from './patient/patient.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://RafaelTomas:rafaeltomas@cluster0.h9zhu.mongodb.net/?retryWrites=true&w=majority',
    ),
    PatientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
