import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoomEntity } from './room.entity';
import { HouseEntity } from './house.entity';

@Entity('house_block')
export class BlockEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'house_id', type: 'int', nullable: false })
  houseId: number;

  @Column({ name: 'code', type: 'varchar', length: 3, nullable: false })
  code: string;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @ManyToOne(
    () => HouseEntity,
    house => house.blocks,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'house_id' })
  house: HouseEntity;

  @OneToMany(
    () => RoomEntity,
    room => room.block,
  )
  rooms: RoomEntity[];
}
