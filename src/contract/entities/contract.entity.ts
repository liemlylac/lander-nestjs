import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contract')
export class Contract extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'room_id', type: 'int' })
  roomId: number;

  @Column({ name: 'customer_id', type: 'varchar' })
  customerId: string;

  @Column({ name: 'start_date', type: 'int' })
  startDate: Date;

  @Column({ name: 'finish_date', type: 'int' })
  finishDate: Date;

  @Column({ name: 'active', type: 'int' })
  active: boolean;
}
