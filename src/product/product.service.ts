import * as fs from 'fs';
import { Like, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { extname } from 'path';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) { }

    async searchProducts(
        searchProductDto: SearchProductDto
    ): Promise<Product[]> {
        if (searchProductDto.name) {
            return (await this.productRepository.find({
                name: Like(`%${searchProductDto.name}%`)
            })).map(product => {
                product.imagePath = product.id + '' + extname(product.imagePath);
                return product
            });
        }

        return (await this.productRepository.find()).map(product => {
            product.imagePath = product.id + '' + extname(product.imagePath);
            return product
        });

    }

    async createProduct(
        createProductDto: CreateProductDto,
        image: Express.Multer.File
    ): Promise<any> {

        const product = Object.assign(this.productRepository.create(), {
            name: createProductDto.name,
            price: createProductDto.price
        });

        await product.save();

        fs.copyFileSync(image.path, `${image.destination}/${product.id}${extname(image.filename)}`);
        fs.unlinkSync(image.path);

        product.imagePath = `${image.destination}/${product.id}${extname(image.filename)}`;
        await product.save();

        return {
            ...product,
            imagePath: `${product.id}${extname(image.filename)}`
        };
    }

}
