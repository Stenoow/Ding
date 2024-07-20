import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Delete,
} from '@nestjs/common';
import { Stock as StockModel } from '@prisma/client';
import {StockService} from "./stock.service";

@Controller()
export class StockController {
    constructor(
        private readonly stockService: StockService
    ) {}

    @Get('stock/:id')
    async getStockById(@Param('id') id: string): Promise<StockModel> {
        return this.stockService.stock({ id: Number(id) });
    }

    @Get('stocks/:idStore?')
    async getAllStocks(@Param('idStore') idStore?: string): Promise<StockModel[]> {
        return this.stockService.stocks({where: { storeId: Number(idStore) } });
    }

    @Post('stock/create')
    async createStock(@Body() stockData: { quantity: number, storeId: number, productId: number }): Promise<StockModel> {
        const { quantity, storeId, productId } = stockData;
        return this.stockService.createStock({
            quantity: Number(quantity),
            store: { connect: {id: Number(storeId)} },
            product: { connect: {id: Number(productId)} },
        });
    }

    @Post('stock/update')
    async updateStock(@Body() stockData: { stockId: number, quantity: number, storeId: number, productId: number }): Promise<StockModel> {
        const { stockId, quantity, storeId, productId } = stockData;
        return this.stockService.updateStock({
            where: { id: Number(stockId) },
            data: {
                quantity: Number(quantity),
                store: { connect: {id: Number(storeId)} },
                product: { connect: {id: Number(productId)} },
            },
        });
    }

    @Delete('stock/:id')
    async deleteStock(@Param('id') id: string): Promise<StockModel> {
        return this.stockService.deleteStock({ id: Number(id) });
    }
}
