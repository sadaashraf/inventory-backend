import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Requisition } from './requisition.entity';

@Entity()
export class RequisitionItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  itemName!: string;

  @Column()
  quantity!: number;

  @Column()
  unit!: string;

  @Column('decimal')
  unitPrice!: number;

  @Column('decimal')
  total!: number;

  @ManyToOne(() => Requisition, (req) => req.items, { onDelete: 'CASCADE' })
  requisition!: Requisition;
}
