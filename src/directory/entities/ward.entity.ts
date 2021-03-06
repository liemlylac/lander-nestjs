import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { District } from './district.entity';

@Entity('directory_region_district_ward')
@Unique(['districtId', 'code'])
export class Ward extends BaseEntity {
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

  @Column({
    name: 'active',
    type: 'tinyint',
    width: 1,
    nullable: false,
    default: 1,
  })
  active: boolean;

  @ManyToOne(
    () => District,
    district => district.wards,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'district_id' })
  district: District;
}
