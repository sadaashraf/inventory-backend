
export class CreatePurchaseDto {
  supplierId!: number;
  purchaseDate!: Date;
  paymentMethod!: string;
  paid!: number;

  items!: {
    itemName: string;
    categoryId: number;
    quantity: number;
    unit: string;
    unitPrice: number;
  }[];
}