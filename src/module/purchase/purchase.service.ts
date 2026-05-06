import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';
import { Repository } from 'typeorm';
import { Category } from '../category/entities/category.entity';
import { Supplier } from '../supplier/entities/supplier.entity';
import { PurchaseItem } from './entities/purchase-item.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PurchaseService {

  constructor(
    @InjectRepository(Purchase)
    private purchaseRepo: Repository<Purchase>,

    @InjectRepository(PurchaseItem)
    private itemRepo: Repository<PurchaseItem>,

    @InjectRepository(Supplier)
    private supplierRepo: Repository<Supplier>,

    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) { }

  async create(dto: any) {
    const supplier = await this.supplierRepo.findOneBy({
      id: dto.supplierId,
    });

    if (!supplier) {
      throw new NotFoundException(`Supplier ${dto.supplierId} not found`);
    }

    let total = 0;

    const items: PurchaseItem[] = [];

    for (const i of dto.items) {
      const category = await this.categoryRepo.findOneBy({
        id: i.category,
      });

      if (!category) {
        throw new NotFoundException(`Category ${i.categoryId} not found`);
      }

      const itemTotal = i.quantity * i.unitPrice;
      total += itemTotal;

      const item = this.itemRepo.create({
        itemName: i.itemName,
        category,
        quantity: i.quantity,
        unit: i.unit,
        unitPrice: i.unitPrice,
        total: itemTotal,
      });

      items.push(item);
    }

    const purchase = this.purchaseRepo.create({
      supplier,
      purchaseDate: dto.purchaseDate,
      paymentMethod: dto.paymentMethod,
      total,
      paid: dto.paid,
      balance: total - dto.paid,
      items,
    });

    return this.purchaseRepo.save(purchase);
  }

  findAll() {
    return this.purchaseRepo.find({
      relations: ['items'],
    });
  }


  findOne(id: number) {
    return this.purchaseRepo.findOne({
      where: { id },
      relations: ['items'],
    });
  }

  async update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    const purchase = await this.purchaseRepo.findOneBy({ id });
    if (!purchase) {
      throw new NotFoundException(`Purchase ${id} not found`);
    }
    Object.assign(purchase, updatePurchaseDto);
    return this.purchaseRepo.save(purchase);
  }

  remove(id: number) {
    return this.purchaseRepo.delete({ id });
  }
}
