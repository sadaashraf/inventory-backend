import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm/browser/repository/Repository.js';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private repo: Repository<Category>
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;
    const existing = await this.repo.findOne({ where: { name } });
    if (existing) {
      throw new BadRequestException(' Name already exists');
    }
    const category = this.repo.create({ name });
    return this.repo.save(category);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.repo.preload({ id, ...updateCategoryDto });
    if (!category) {
      throw new BadRequestException('Category not found');
    }
    return this.repo.save(category);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
