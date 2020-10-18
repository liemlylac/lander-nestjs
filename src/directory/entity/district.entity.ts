import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { RegionEntity } from './region.entity';
import { WardEntity } from './ward.entity';

@Entity('directory_region_district')
@Unique(['regionId', 'code'])
export class DistrictEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'region_id', type: 'int', nullable: false })
  regionId: number;

  @Column({ name: 'code', type: 'varchar', length: 3, nullable: false })
  code: string;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'ship_code', type: 'varchar', length: 10, nullable: true })
  shipCode: string;

  @Column({
    name: 'active',
    type: 'tinyint',
    width: 1,
    nullable: false,
    default: 1,
  })
  active: boolean;

  @ManyToOne(
    () => RegionEntity,
    region => region.districts,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'region_id' })
  region: RegionEntity;

  @OneToMany(
    () => WardEntity,
    ward => ward.district,
  )
  wards: WardEntity;
}
