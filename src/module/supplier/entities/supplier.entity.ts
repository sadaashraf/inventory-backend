import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  supplierName!: string;

  @Column()
  shopName!: string;

  @Column()
  address!: string;

  @Column()
  phoneNumber!: string;
}