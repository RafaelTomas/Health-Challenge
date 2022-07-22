import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientModule } from './app/patient/patient.module';

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
