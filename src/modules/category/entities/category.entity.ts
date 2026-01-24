import { Product } from 'src/modules/products/entities/product.entity';
import { Column, OneToMany, PrimaryColumn } from 'typeorm';

export class Category {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
