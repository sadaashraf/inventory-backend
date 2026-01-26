import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from '../category/entities/category.entity';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private ProductRepo: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepe: Repository<Category>

  ) { }

  async create(createProductDto: CreateProductDto) {
    const { category_id } = createProductDto;

    let category;
    if (category_id) {
      category = await this.categoryRepe.findOneBy({ id: category_id });
      if (!category) {
        throw new NotFoundException('Category not found');
      }
    }

    const product = this.ProductRepo.create({
      ...createProductDto,
      category, // assign the entity, not just id
    });

    return this.ProductRepo.save(product);
  }


  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
