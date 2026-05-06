
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Supplier } from '../../supplier/entities/supplier.entity';
import { PurchaseItem } from './purchase-item.entity';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Supplier, { eager: true })
  supplier!: Supplier;

  @Column()
  purchaseDate!: Date;

  @Column()
  paymentMethod!: string;

  @Column('decimal', { default: 0 })
  total!: number;

  @Column('decimal', { default: 0 })
  paid!: number;

  @Column('decimal', { default: 0 })
  balance!: number;

  @OneToMany(() => PurchaseItem, (item) => item.purchase, {
    cascade: true,
  })
  items!: PurchaseItem[];
}