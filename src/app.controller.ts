import { Controller, Get, NotFoundException, Param, Res, UseGuards } from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { AppService } from './app.service';
import { Product } from './product/entities/product.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiResponse({
    description: 'Load product\'s image',
    status: 200
  })
  @Get('images/:id')
  @ApiProperty({
    description: 'id of product',
    example: 1
  })
  async getImage(
    @Param() id: number,
    @Res() res: Response
  ) {
    const product = await Product.findOne(id);

    if (!product) {
      throw new NotFoundException('Image not existed');
    }

    return res.sendFile(product.imagePath, { root: '.' });
  }
}
