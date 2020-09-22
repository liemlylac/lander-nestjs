import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { BlockEntity } from './block.entity';
import { RoomEntity } from './room.entity';

@Entity('house')
export class HouseEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'region_id', type: 'varchar', nullable: false })
  regionId: number;

  @Column({ name: 'district_id', type: 'varchar', nullable: false })
  districtId: number;

  @Column({ name: 'ward_id', type: 'int', nullable: false })
  wardId: number;

  @Column({ name: 'street', type: 'varchar', length: 255, nullable: false })
  street: string;

  @Column({ name: 'phone', type: 'varchar', length: 255, nullable: false })
  phone: string;

  @Column({
    name: 'is_verified',
    type: 'tinyint',
    width: 1,
    nullable: false,
    default: 0,
  })
  isVerified: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(
    () => UserEntity,
    user => user.houses,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'user_id' })
  users: UserEntity;

  @OneToMany(
    () => BlockEntity,
    block => block.house,
  )
  blocks: BlockEntity[];

  @OneToMany(
    () => RoomEntity,
    room => room.house,
  )
  rooms: RoomEntity[];
}
