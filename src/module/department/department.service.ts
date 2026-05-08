import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Requisition } from '../requisition/entities/requisition.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepo: Repository<Department>,

    @InjectRepository(Requisition)
    private requisitionRepo: Repository<Requisition>,
  ) {}

  create(dto: CreateDepartmentDto) {
    const department = this.departmentRepo.create(dto);
    return this.departmentRepo.save(department);
  }

  findAll() {
    return this.departmentRepo.find();
  }

  findOne(id: number) {
    return this.departmentRepo.findOneBy({ id });
  }

  async update(id: number, dto: UpdateDepartmentDto) {
    const dept = await this.departmentRepo.findOneBy({ id });
    if (!dept) throw new NotFoundException(`Department ${id} not found`);
    Object.assign(dept, dto);
    return this.departmentRepo.save(dept);
  }

  async remove(id: number) {
    await this.requisitionRepo
      .createQueryBuilder()
      .update()
      .set({ department: null as any })
      .where('departmentId = :id', { id })
      .execute();
    return this.departmentRepo.delete({ id });
  }
}
