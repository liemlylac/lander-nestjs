import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectoryController } from './controller/directory.controller';
import { DistrictRepository } from './repository/district.repository';
import { RegionRepository } from './repository/region.repository';
import { WardRepository } from './repository/ward.repository';
import { DirectoryService } from './service/directory.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RegionRepository,
      DistrictRepository,
      WardRepository,
    ]),
  ],
  controllers: [DirectoryController],
  providers: [DirectoryService],
  exports: [DirectoryService],
})
export class DirectoryModule {}
