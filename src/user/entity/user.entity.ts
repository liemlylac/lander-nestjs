import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEntity } from '../../auth/entity/role.entity';
import { HouseEntity } from '../../house/entity/house.entity';
import { UserAddressEntity } from './user-address.entity';
import { UserGroupEntity } from './user-group.entity';
import { UserSettingEntity } from './user-setting.entity';

@Entity('user')
export class UserEntity {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', type: 'varchar', length: 255, nullable: false })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 255, nullable: false })
  lastName: string;

  @Column({ name: 'email', type: 'varchar', length: 255, nullable: false })
  email: string;

  @Exclude()
  @Column({ name: 'password', type: 'varchar', length: 150, nullable: false })
  password: string;

  @Column({ name: 'phone', type: 'varchar', length: 15, nullable: true })
  phone: string;

  @Column({ name: 'avatar', type: 'varchar', length: 255, nullable: true })
  avatar: string;

  @Exclude()
  @Column({
    name: 'active',
    type: 'tinyint',
    width: 1,
    nullable: false,
    default: 1,
  })
  active: boolean;

  @Column({ name: 'birthday', type: 'datetime', nullable: true })
  birthday: Date;

  @Column({ name: 'gender', type: 'tinyint', width: 1, nullable: true })
  gender: number;

  @Column({ name: 'country', type: 'varchar', length: 10, nullable: false })
  country: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(
    () => RoleEntity,
    role => role.users,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  @OneToMany(
    () => UserAddressEntity,
    address => address.user,
  )
  addresses: UserAddressEntity[];

  @OneToOne(
    () => UserGroupEntity,
    group => group.user,
  )
  group: UserGroupEntity;

  @ManyToMany(
    () => HouseEntity,
    house => house.users,
  )
  @JoinColumn({ name: 'house_id' })
  houses: HouseEntity[];

  @OneToMany(
    () => UserSettingEntity,
    userSetting => userSetting.user,
  )
  settings: UserSettingEntity[];

  @Expose()
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
