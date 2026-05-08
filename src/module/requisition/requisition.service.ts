import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Requisition } from './entities/requisition.entity';
import { RequisitionItem } from './entities/requisition-item.entity';
import { Department } from '../department/entities/department.entity';
import { CreateRequisitionDto } from './dto/create-requisition.dto';
import { UpdateRequisitionDto } from './dto/update-requisition.dto';

@Injectable()
export class RequisitionService {
  constructor(
    @InjectRepository(Requisition)
    private requisitionRepo: Repository<Requisition>,

    @InjectRepository(RequisitionItem)
    private itemRepo: Repository<RequisitionItem>,

    @InjectRepository(Department)
    private departmentRepo: Repository<Department>,
  ) {}

  async create(dto: CreateRequisitionDto) {
    const department = await this.departmentRepo.findOneBy({ id: dto.departmentId });
    if (!department) throw new NotFoundException(`Department ${dto.departmentId} not found`);

    let total = 0;
    const items: RequisitionItem[] = [];

    for (const i of dto.items) {
      const itemTotal = Number(i.quantity) * Number(i.unitPrice);
      total += itemTotal;
      items.push(this.itemRepo.create({
        itemName: i.itemName,
        quantity: i.quantity,
        unit: i.unit,
        unitPrice: i.unitPrice,
        total: itemTotal,
      }));
    }

    const requisition = this.requisitionRepo.create({
      department,
      issueDate: new Date(dto.issueDate),
      total,
      items,
    });

    const saved = await this.requisitionRepo.save(requisition);
    return this.requisitionRepo.findOne({ where: { id: saved.id }, relations: ['items'] });
  }

  findAll() {
    return this.requisitionRepo.find({ relations: ['items'] });
  }

  findOne(id: number) {
    return this.requisitionRepo.findOne({ where: { id }, relations: ['items'] });
  }

  async update(id: number, dto: UpdateRequisitionDto) {
    const requisition = await this.requisitionRepo.findOneBy({ id });
    if (!requisition) throw new NotFoundException(`Requisition ${id} not found`);
    Object.assign(requisition, dto);
    return this.requisitionRepo.save(requisition);
  }

  async remove(id: number) {
    await this.itemRepo.delete({ requisition: { id } });
    return this.requisitionRepo.delete({ id });
  }
}
