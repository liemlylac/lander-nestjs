import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_setting')
export class UserSetting extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', type: 'varchar' })
  userId: string;

  @Column({ name: 'key', type: 'varchar', length: 255 })
  key: string;

  @Column({ name: 'value', type: 'text' })
  value: string;

  @ManyToOne(
    () => User,
    user => user.settings,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'user_id' })
  user: User;

  constructor(setting?: Partial<UserSetting>) {
    super();
    Object.assign(this, setting);
  }
}
