import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockEntity } from './entity/block.entity';
import { HouseEntity } from './entity/house.entity';
import { RoomEntity } from './entity/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HouseEntity, BlockEntity, RoomEntity])],
})
export class HouseModule {}
