import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_address')
export class UserAddress extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'user_id', type: 'varchar', nullable: false })
  userId: string;

  @Column({ name: 'region_id', type: 'varchar', nullable: false })
  regionId: string;

  @Column({ name: 'district_id', type: 'varchar', nullable: false })
  districtId: string;

  @Column({ name: 'ward_id', type: 'int', nullable: false })
  wardId: string;

  @Column({ name: 'street', type: 'varchar', length: 255, nullable: false })
  street: string;

  @Column({ name: 'phone', type: 'varchar', length: 255, nullable: false })
  phone: string;

  @Column({
    name: 'is_default',
    type: 'varchar',
    length: 255,
    nullable: false,
    default: 0,
  })
  isDefault: string;

  @Column({
    name: 'is_verified',
    type: 'varchar',
    length: 255,
    nullable: false,
    default: 0,
  })
  isVerified: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(
    () => User,
    user => user.addresses,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'user_id' })
  user: User;
}
