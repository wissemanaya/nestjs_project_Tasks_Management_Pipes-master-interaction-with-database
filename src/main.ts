import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()) ;           // to tell nestjs that we use pipes we don't have to define it in any controller 
  await app.listen(3000);
}
bootstrap();
