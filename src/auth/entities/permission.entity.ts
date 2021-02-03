import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { Action } from './action.entity';
import { Resource } from './resource.entity';
import { Role } from './role.entity';

@Entity('auth_role_permission')
@Unique(['roleId', 'resourceId', 'actionId'])
export class Permission extends BaseEntity {
  @PrimaryColumn({ name: 'role_id', type: 'int' })
  roleId: number;

  @PrimaryColumn({ name: 'resource_id', type: 'int' })
  resourceId: number;

  @PrimaryColumn({ name: 'action_id', type: 'int' })
  actionId: number;

  @Column({
    name: 'is_allowed',
    type: 'tinyint',
    width: 1,
    nullable: false,
    default: 0,
  })
  isAllowed: boolean;

  @ManyToOne(
    () => Role,
    role => role.permission,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(
    () => Resource,
    resource => resource.permissions,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'resource_id' })
  resources: Resource[];

  @ManyToOne(
    () => Action,
    action => action.permissions,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'action_id' })
  actions: Action[];
}
