import { ConfigModule } from '@config/config.module';
import { CoreModule } from '@core/core.module';
import { LoggerMiddleware } from '@core/middleware/logger.middleware';
import { MailConfigService } from '@core/services/mail-config.service';
import { MailerModule } from '@nestjs-modules/mailer';
import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { providers } from './app.providers';
import { AuthModule } from './auth/auth.module';
import { ContractModule } from './contract/contract.module';
import { CustomerModule } from './customer/customer.module';
import { MysqlModule } from './database/mysql.module';
import { DirectoryModule } from './directory/directory.module';
import { GroupModule } from './group/group.module';
import { HouseModule } from './house/house.module';
import { PaymentModule } from './payment/payment.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    ContractModule,
    CoreModule,
    CustomerModule,
    MailerModule.forRootAsync({ useClass: MailConfigService }),
    MysqlModule.forRoot(),
    DirectoryModule,
    GroupModule,
    HouseModule,
    PaymentModule,
    UserModule,
  ],
  providers: [...providers, Logger],
})
export class AppModule implements NestModule {
  // noinspection JSUnusedGlobalSymbols
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
