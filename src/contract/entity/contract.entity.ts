import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contract')
export class ContractEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'room_id', type: 'int' })
  roomId: number;

  @Column({ name: 'customer_id', type: 'varchar' })
  customerId: number;
}
