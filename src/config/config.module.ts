import { INestApplication, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://RafaelTomas:rafaeltomas@cluster0.h9zhu.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [],
  providers: [],
})
export class ConfigModule {
  static setupSwagger(app: INestApplication) {
    const options = new DocumentBuilder()
      .setTitle('Patient health')
      .setDescription('challenge to create a crud for the patient list')
      .setVersion('1.0')
      .addTag('patient')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }
}
