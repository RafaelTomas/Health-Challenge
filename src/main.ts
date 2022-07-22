import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigModule } from './config/config.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  ConfigModule.setupSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
