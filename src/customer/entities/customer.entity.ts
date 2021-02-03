import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customer')
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', type: 'varchar', length: 255, nullable: false })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 255, nullable: false })
  lastName: string;

  @Exclude()
  @Column({ name: 'password', type: 'varchar', length: 150, nullable: false })
  password: string;

  @Column({ name: 'id_card', type: 'varchar', length: 15, nullable: true })
  idCard: string;

  @Column({ name: 'email', type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ name: 'phone', type: 'varchar', length: 15, nullable: false })
  phone: string;

  @Column({ name: 'avatar', type: 'varchar', length: 255, nullable: true })
  avatar: string;

  @Column({ name: 'birthday', type: 'datetime', nullable: true })
  birthday: Date;

  @Column({ name: 'gender', type: 'tinyint', width: 1, nullable: true })
  gender: number;

  @Column({ name: 'job', type: 'varchar', length: 255, nullable: true })
  job: string;

  @Column({ name: 'country', type: 'varchar', length: 10, nullable: false })
  country: string;

  @Column({
    name: 'active',
    type: 'tinyint',
    width: 1,
    nullable: false,
    default: 1,
  })
  active: boolean;
}
