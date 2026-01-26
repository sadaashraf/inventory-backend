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
    return this.ProductRepo.find({ relations: ['category'] });
  }

  async findOne(id: number) {
    const product = await this.ProductRepo.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.ProductRepo.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const { category_id, ...rest } = updateProductDto;

    // update category if provided
    if (category_id) {
      const category = await this.categoryRepe.findOneBy({ id: category_id });
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      product.category = category;
    }

    Object.assign(product, rest);

    return this.ProductRepo.save(product);
  }

  // --- DELETE ---
  async remove(id: number) {
    const product = await this.ProductRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');

    await this.ProductRepo.remove(product);
    return { message: 'Product deleted successfully' };
  }
}
