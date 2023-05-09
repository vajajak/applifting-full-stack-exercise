import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('CDP Ivory')
    .setDescription('CDP Ivory API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({ credentials: true, origin: process.env.FE_BASE_URL });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  // useContainer(app.select(AppModule), { fallbackOnErrors: true });
  // app.useGlobalGuards(new gqlJWTAuthGuard());
  await app.listen(process.env.APP_PORT);
}

bootstrap();
