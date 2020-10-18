import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { DistrictEntity } from './district.entity';

@Entity('directory_region')
@Unique(['countryCode', 'code'])
export class RegionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'country_code', type: 'varchar', length: 3, nullable: false })
  countryCode: string;

  @Column({ name: 'code', type: 'varchar', length: 2, nullable: false })
  code: string;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'post_code', type: 'varchar', length: 6, nullable: true })
  postCode: string;

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

  @OneToMany(
    () => DistrictEntity,
    district => district.region,
  )
  districts: DistrictEntity;
}
