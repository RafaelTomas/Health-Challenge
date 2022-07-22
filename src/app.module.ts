import { Module } from '@nestjs/common';
import { PatientModule } from './app/patient/patient.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule, PatientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
