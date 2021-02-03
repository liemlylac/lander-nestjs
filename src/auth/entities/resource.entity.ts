import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Action } from './action.entity';
import { Permission } from './permission.entity';

@Entity('auth_resource')
export class Resource extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'code', type: 'varchar', length: 50 })
  code: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @OneToMany(
    () => Action,
    action => action.resource,
  )
  actions: Action;

  @OneToMany(
    () => Permission,
    permission => permission.resources,
  )
  permissions: Permission[];
}
