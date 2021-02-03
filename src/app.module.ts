import { ConfigModule } from '@config/config.module';
import { MailerModule } from '@nestjs-modules/mailer';
import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { LoggerMiddleware } from '@app/common';
import { MailConfigService } from '@app/mail';

import { providers } from './app.providers';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ContractModule } from './contract/contract.module';
import { CustomerModule } from './customer/customer.module';
import { MysqlModule } from './database/mysql.module';
import { DirectoryModule } from './directory/directory.module';
import { GroupModule } from './group/group.module';
import { HouseModule } from './house/house.module';
import { MailModule } from './mail/mail.module';
import { PaymentModule } from './payment/payment.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot(),
    AuthModule,
    ContractModule,
    CustomerModule,
    MailModule.forRoot(),
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
