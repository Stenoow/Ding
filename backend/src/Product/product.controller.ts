import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Delete,
} from '@nestjs/common';
import { Product as ProductModel } from '@prisma/client';
import {ProductService} from "./product.service";

@Controller()
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) {}

    @Get('product/:id')
    async getStoreById(@Param('id') id: string): Promise<ProductModel> {
        return this.productService.product({ id: Number(id) });
    }

    @Get('products')
    async getAllStores(): Promise<ProductModel[]> {
        return this.productService.products({});
    }

    @Post('product/create')
    async createStore(@Body() productData: { name: string }): Promise<ProductModel> {
        const { name } = productData;
        return this.productService.createProduct({
            name
        });
    }

    @Post('product/update')
    async updateStore(@Body() productData: { id: number, name: string }): Promise<ProductModel> {
        return this.productService.updateProduct({
            where: { id: Number(productData.id) },
            data: { name: productData.name },
        });
    }

    @Delete('product/:id')
    async deleteStore(@Param('id') id: string): Promise<ProductModel> {
        return this.productService.deleteProduct({ id: Number(id) });
    }
}
