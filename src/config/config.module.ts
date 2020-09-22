import * as Joi from '@hapi/joi';
import { DynamicModule, Module } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  ConfigService,
} from '@nestjs/config';
import { config } from './config';
import { configSchema } from './config.schema';

@Module({})
export class ConfigModule {
  static forRoot(): DynamicModule {
    return {
      module: ConfigModule,
      imports: [
        NestConfigModule.forRoot({
          isGlobal: true,
          load: [config],
          validationSchema: Joi.object({
            ...configSchema,
          }),
        }),
      ],
      providers: [ConfigService],
      exports: [ConfigService],
    };
  }
}
