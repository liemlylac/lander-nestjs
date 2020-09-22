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
import { GroupEntity } from '../../group/entity/group.entity';
import { UserEntity } from './user.entity';

@Entity('user_group')
export class UserGroupEntity extends BaseEntity {
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
    () => GroupEntity,
    group => group.userGroup,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'group_id' })
  group: GroupEntity;

  @OneToOne(
    () => UserEntity,
    user => user.group,
  )
  user: UserEntity;
}
