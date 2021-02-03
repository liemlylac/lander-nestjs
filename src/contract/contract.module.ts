import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractController } from './contract.controller';
import { ContractRepository } from './resources';
import { ContractService } from './services/';

@Module({
  imports: [TypeOrmModule.forFeature([ContractRepository])],
  controllers: [ContractController],
  providers: [ContractService],
  exports: [ContractService],
})
export class ContractModule {}
