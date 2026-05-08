import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Purchase } from './purchase.entity';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class PurchaseItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  itemName!: string;

  @ManyToOne(() => Category, { eager: true })
  category!: Category;

  @Column()
  quantity!: number;

  @Column()
  unit!: string;

  @Column('decimal')
  unitPrice!: number;

  @Column('decimal')
  total!: number;

  @ManyToOne(() => Purchase, (purchase) => purchase.items, { onDelete: 'CASCADE' })
  purchase!: Purchase;
}