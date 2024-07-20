import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Stock } from '@prisma/client';

@Injectable()
export class StockService {
    constructor(private prisma: PrismaService) {}

    async stock( stockWhereUniqueInput: Prisma.StockWhereUniqueInput ): Promise<Stock | null> {
        return this.prisma.stock.findUnique({
            where: stockWhereUniqueInput,
        });
    }

    async stocks(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.StockWhereUniqueInput;
        where?: Prisma.StockWhereInput;
        orderBy?: Prisma.StockOrderByWithRelationInput;
    }): Promise<Stock[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.stock.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createStock(data: Prisma.StockCreateInput): Promise<Stock> {
        return this.prisma.stock.create({
            data,
        });
    }

    async updateStock(params: {
        where: Prisma.StockWhereUniqueInput;
        data: Prisma.StockUpdateInput;
    }): Promise<Stock> {
        const { where, data } = params;
        return this.prisma.stock.update({
            data,
            where,
        });
    }

    async deleteStock(where: Prisma.StockWhereUniqueInput): Promise<Stock> {
        return this.prisma.stock.delete({
            where,
        });
    }

    async deleteStocksByStoreId(storeId: number): Promise<void> {
        await this.prisma.stock.deleteMany({
            where: {
                storeId: storeId,
            },
        });
    }
}