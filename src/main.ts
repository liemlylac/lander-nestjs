import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const configService = app.get(ConfigService);
  /**
   * Swagger Api code block
   */
  if (configService.get<boolean>('enableSwagger')) {
    const options = new DocumentBuilder()
      .setTitle('Lander Software')
      .setDescription('Software manager boarding house')
      .setVersion('0.1.0')
      .setContact('Liem Vo', null, 'liemlylac@gmail.com')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(configService.get<string>('apiRoot'), app, document);
  }

  await app.listen(configService.get<number>('port'));
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
