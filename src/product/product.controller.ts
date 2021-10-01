import { Body, Controller, Get, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { editFileName, imageFileFilter } from 'src/shared/utils/file-upload.util';
import { CreateProductDto } from './dto/create-product.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductController {

    constructor(
        private readonly productService: ProductService
    ) { }

    @ApiResponse({
        description: 'Get list of all products',
        type: [Product],
        status: 200
    })
    @Get()
    async products(
        @Query() searchProductDto: SearchProductDto
    ): Promise<Product[]> {
        return this.productService.searchProducts(searchProductDto);
    }

    @ApiResponse({
        description: 'Create new product',
        type: Product,
        status: 201
    })
    @Post('create')
    @UseInterceptors(FileInterceptor('image', {
        fileFilter: imageFileFilter,
        storage: diskStorage({
            destination: './uploads',
            filename: editFileName
        })
    }))
    async create(
        @Body() createProductDto: CreateProductDto,
        @UploadedFile() image: Express.Multer.File
    ): Promise<any> {
        return this.productService.createProduct(createProductDto, image);
    }



}
