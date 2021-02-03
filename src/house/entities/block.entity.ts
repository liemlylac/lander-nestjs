import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from './room.entity';
import { House } from './house.entity';

@Entity('house_block')
export class Block extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'house_id', type: 'int', nullable: false })
  houseId: number;

  @Column({ name: 'code', type: 'varchar', length: 3, nullable: false })
  code: string;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @ManyToOne(
    () => House,
    house => house.blocks,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'house_id' })
  house: House;

  @OneToMany(
    () => Room,
    room => room.block,
  )
  rooms: Room[];
}
