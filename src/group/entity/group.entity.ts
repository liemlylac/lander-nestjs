import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserGroupEntity } from '../../user/entity/user-group.entity';

@Entity('group')
export class GroupEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @OneToMany(
    () => UserGroupEntity,
    userGroup => userGroup.group,
  )
  userGroup: UserGroupEntity;
}
