import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepo: Repository<Department>,
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

  remove(id: number) {
    return this.departmentRepo.delete({ id });
  }
}
