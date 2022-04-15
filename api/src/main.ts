import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {ValidationPipe} from "./validations/validation.pipe";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Test')
    .setDescription('Test api')
    .setVersion('1.0')
    .addTag('test')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3001);
}
bootstrap();
