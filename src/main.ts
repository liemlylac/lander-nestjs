import { ConfigService } from '@config/config.service';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 5 * 60 * 1000, // 5 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  const config = app.get(ConfigService);
  /**
   * Swagger Api code block
   */
  if (config.get('enableSwagger')) {
    const options = new DocumentBuilder()
      .setTitle('Lander Software')
      .setDescription('Software manager boarding house')
      .setVersion('0.1.0')
      .setContact('Liem Vo', null, 'liemlylac@gmail.com')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(config.get('apiRoot'), app, document);
  }

  await app.listen(config.get('port'));
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
