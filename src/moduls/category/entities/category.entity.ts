import { Column, PrimaryColumn } from "typeorm";

export class Category {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}
