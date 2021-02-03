import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserGroup } from '../../user';

@Entity('group')
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @OneToMany(
    () => UserGroup,
    userGroup => userGroup.group,
  )
  userGroup: UserGroup;
}
