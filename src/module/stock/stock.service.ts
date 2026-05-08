import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from '../purchase/entities/purchase.entity';
import { Requisition } from '../requisition/entities/requisition.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepo: Repository<Purchase>,

    @InjectRepository(Requisition)
    private requisitionRepo: Repository<Requisition>,
  ) {}

  async findAll() {
    const purchases = await this.purchaseRepo.find({ relations: ['items'] });
    const requisitions = await this.requisitionRepo.find({ relations: ['items'] });

    const stockMap = new Map<string, { itemName: string; category: string; quantity: number; unit: string; unitPrice: number }>();

    for (const purchase of purchases) {
      for (const item of purchase.items) {
        const key = item.itemName.toLowerCase();
        const existing = stockMap.get(key);
        if (existing) {
          existing.quantity += Number(item.quantity);
        } else {
          stockMap.set(key, {
            itemName: item.itemName,
            category: item.category?.name ?? '',
            quantity: Number(item.quantity),
            unit: item.unit,
            unitPrice: Number(item.unitPrice),
          });
        }
      }
    }

    for (const requisition of requisitions) {
      for (const item of requisition.items) {
        const key = item.itemName.toLowerCase();
        const existing = stockMap.get(key);
        if (existing) {
          existing.quantity = Math.max(0, existing.quantity - Number(item.quantity));
        }
      }
    }

    return Array.from(stockMap.values());
  }
}
