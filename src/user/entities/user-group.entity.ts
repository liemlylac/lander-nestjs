import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Group } from '../../group';
import { User } from './user.entity';

@Entity('user_group')
export class UserGroup extends BaseEntity {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  groupId: number;

  @Column()
  expiredAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    () => Group,
    group => group.userGroup,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @OneToOne(
    () => User,
    user => user.group,
  )
  user: User;
}
