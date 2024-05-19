import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('MiPichanga (Users) - API')
    .setDescription(
      'API para la gestión de usuarios en MiPichanga. Permite obtener, actualizar y eliminar el perfil de usuario, así como gestionar partidos asociados.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('users', 'Endpoints relacionados con la gestión de usuarios')
    .addTag('auth', 'Endpoints relacionados con la autenticación de usuarios')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.use(cookieParser());

  app.enableCors({
    credentials: true,
    origin: process.env.FRONTEND_URL.split(', '),
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
