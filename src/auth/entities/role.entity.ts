import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user';
import { Permission } from './permission.entity';

@Entity('auth_role')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'code', type: 'varchar', length: 50 })
  code: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @OneToMany(
    () => User,
    user => user.role,
  )
  users: User[];

  @OneToMany(
    () => Permission,
    permission => permission.role,
  )
  permission: Permission[];
}
