
import { IsNotEmpty } from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty()
  supplierName!: string;

  @IsNotEmpty()
  shopName!: string;

  @IsNotEmpty()
  address!: string;

  @IsNotEmpty()
  phoneNumber!: string;
}