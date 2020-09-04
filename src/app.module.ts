import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DirectoryModule } from './directory/directory.module';
import { GroupModule } from './group/group.module';
import { HouseModule } from './house/house.module';
import { BlockModule } from './block/block.module';
import { FloorModule } from './floor/floor.module';
import { RoomModule } from './room/room.module';
import { CustomerModule } from './customer/customer.module';
import { ContractModule } from './contract/contract.module';
import { PaymentModule } from './payment/payment.module';
import { InvoiceModule } from './invoice/invoice.module';
import { SettingModule } from './setting/setting.module';

@Module({
  imports: [
    BlockModule,
    ContractModule,
    CustomerModule,
    DirectoryModule,
    FloorModule,
    GroupModule,
    HouseModule,
    InvoiceModule,
    PaymentModule,
    RoomModule,
    UserModule,
    SettingModule,
  ],
})
export class AppModule {}
