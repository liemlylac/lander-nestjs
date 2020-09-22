import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { InitialDatabase010 } from '../migration/initial-database.0.1.0';

@Module({})
export class MysqlModule {
  static forRoot(): DynamicModule {
    // noinspection JSUnusedGlobalSymbols
    return {
      module: MysqlModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            type: 'mysql', // Current only support connect one db type is mysql
            host: configService.get<string>('db.host'),
            port: configService.get<number>('db.port'),
            username: configService.get<string>('db.username'),
            password: configService.get<string>('db.password'),
            database: configService.get<string>('db.database'),
            entities: ['dist/**/*.entity{.ts,.js}'],
            synchronize: true,
            logging: configService.get<boolean>('db.logging'),
            migrationsTableName: 'migration',
            migrations: [InitialDatabase010],
            cli: {
              entitiesDir: '/**/*.entity{.ts, .js}',
              migrationsDir: '/migration',
            },
          }),
        }),
      ],
      exports: [TypeOrmModule],
    };
  }
}
