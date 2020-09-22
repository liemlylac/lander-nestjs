import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from './entity/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity])],
})
export class GroupModule {}
