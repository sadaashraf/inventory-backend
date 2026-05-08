import { IsNotEmpty } from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  manager!: string;

  @IsNotEmpty()
  phoneNo!: string;
}
