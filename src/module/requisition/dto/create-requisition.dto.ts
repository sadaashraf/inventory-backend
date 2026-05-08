import { IsNotEmpty, IsArray, IsNumber, IsDateString } from 'class-validator';

export class CreateRequisitionItemDto {
  @IsNotEmpty()
  itemName!: string;

  @IsNumber()
  quantity!: number;

  @IsNotEmpty()
  unit!: string;

  @IsNumber()
  unitPrice!: number;
}

export class CreateRequisitionDto {
  @IsNumber()
  departmentId!: number;

  @IsDateString()
  issueDate!: string;

  @IsArray()
  items!: CreateRequisitionItemDto[];
}
