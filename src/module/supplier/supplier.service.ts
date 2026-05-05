import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepo: Repository<Supplier>,
  ) { }

  create(dto: CreateSupplierDto) {
    const supplier = this.supplierRepo.create(dto);
    return this.supplierRepo.save(supplier);
  }

  findAll() {
    return this.supplierRepo.find();
  }

  findOne(id: number) {
    return this.supplierRepo.findOneBy({ id });
  }

  update(id: number, dto: UpdateSupplierDto) {
    return this.supplierRepo.update({ id }, dto);
  }

  remove(id: number) {
    return this.supplierRepo.delete({ id });
  }
}
