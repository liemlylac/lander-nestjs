import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BlockEntity } from './block.entity';
import { HouseEntity } from './house.entity';

@Entity('house_block_room')
export class RoomEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'house_id', type: 'int', nullable: false })
  houseId: number;

  @Column({ name: 'block_id', type: 'int', nullable: false })
  blockId: number;

  @Column({ name: 'code', type: 'varchar', length: 10, nullable: false })
  code: string;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @ManyToOne(
    () => HouseEntity,
    house => house.rooms,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'house_id' })
  house: HouseEntity;

  @ManyToOne(
    () => BlockEntity,
    block => block.rooms,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'block_id' })
  block: BlockEntity;
}
