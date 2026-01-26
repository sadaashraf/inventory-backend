import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private categoryRepe: Repository<Category>,
  ) { }
  create(createCategoryDto: CreateCategoryDto) {
    const { name, description } = createCategoryDto;
    const category = this.categoryRepe.create({
      name,
      description,
    });
    return this.categoryRepe.save(category);
  }

  findAll() {
    return this.categoryRepe.find();
  }

  findOne(id: number) {
    const category = this.categoryRepe.findOneBy({ id });
    if (!category) {
      throw new Error(`ID ${id} not found`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepe.findOneBy({ id });
    if (!category) {
      throw new Error(`ID ${id} not found`);
    }
    Object.assign(category, updateCategoryDto);
    return this.categoryRepe.save(category);

  }

  remove(id: number) {
    return this.categoryRepe.delete(id);
  }
}
