import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from '../purchase/entities/purchase.entity';
import { Requisition } from '../requisition/entities/requisition.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepo: Repository<Purchase>,

    @InjectRepository(Requisition)
    private requisitionRepo: Repository<Requisition>,
  ) {}

  async getSummary() {
    const purchases = await this.purchaseRepo.find({ relations: ['items'] });
    const requisitions = await this.requisitionRepo.find({ relations: ['items'] });

    const stockMap = new Map<string, { itemName: string; purchaseQuantity: number; saleQuantity: number; availableQuantity: number; unit: string }>();

    for (const purchase of purchases) {
      for (const item of purchase.items) {
        const key = item.itemName.toLowerCase();
        const existing = stockMap.get(key);
        if (existing) {
          existing.purchaseQuantity += Number(item.quantity);
          existing.availableQuantity += Number(item.quantity);
        } else {
          stockMap.set(key, {
            itemName: item.itemName,
            purchaseQuantity: Number(item.quantity),
            saleQuantity: 0,
            availableQuantity: Number(item.quantity),
            unit: item.unit,
          });
        }
      }
    }

    for (const requisition of requisitions) {
      for (const item of requisition.items) {
        const key = item.itemName.toLowerCase();
        const existing = stockMap.get(key);
        if (existing) {
          existing.saleQuantity += Number(item.quantity);
          existing.availableQuantity = Math.max(0, existing.availableQuantity - Number(item.quantity));
        }
      }
    }

    return Array.from(stockMap.values());
  }
}
