import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { DistrictEntity } from './district.entity';

@Entity('directory_region_district_ward')
@Unique(['districtId', 'code'])
export class WardEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'district_id', type: 'int', nullable: false })
  districtId: number;

  @Column({ name: 'code', type: 'varchar', length: 5, nullable: false })
  code: string;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'ship_code', type: 'varchar', length: 10, nullable: true })
  shipCode: string;

  @ManyToOne(
    () => DistrictEntity,
    district => district.wards,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'district_id' })
  district: DistrictEntity;
}
