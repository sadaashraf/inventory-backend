import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Department } from '../../department/entities/department.entity';
import { RequisitionItem } from './requisition-item.entity';

@Entity()
export class Requisition {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Department, { eager: true, onDelete: 'SET NULL', nullable: true })
  department!: Department;

  @Column()
  issueDate!: Date;

  @Column('decimal', { default: 0 })
  total!: number;

  @OneToMany(() => RequisitionItem, (item) => item.requisition, { cascade: true })
  items!: RequisitionItem[];
}
