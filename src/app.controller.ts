import { Controller, Get, NotFoundException, Param, Res, UseGuards } from '@nestjs/common';
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

  @Get('images/:id')
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
