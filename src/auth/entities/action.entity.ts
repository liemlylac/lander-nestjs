import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission } from './permission.entity';
import { Resource } from './resource.entity';

@Entity('auth_resource_action')
export class Action extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'resource_id', type: 'int' })
  resourceId: number;

  @Column({ name: 'code', type: 'varchar', length: 50 })
  code: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(
    () => Resource,
    resource => resource.actions,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'resource_id' })
  resource: Resource;

  @OneToMany(
    () => Permission,
    permission => permission.actions,
  )
  permissions: Permission;
}
