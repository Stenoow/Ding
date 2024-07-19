import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Store } from '@prisma/client';

@Injectable()
export class StoreService {
    constructor(private prisma: PrismaService) {}

    async store( storeWhereUniqueInput: Prisma.StoreWhereUniqueInput ): Promise<Store | null> {
        return this.prisma.store.findUnique({
            where: storeWhereUniqueInput,
        });
    }

    async stores(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.StoreWhereUniqueInput;
        where?: Prisma.StoreWhereInput;
        orderBy?: Prisma.StoreOrderByWithRelationInput;
    }): Promise<Store[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.store.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createStore(data: Prisma.StoreCreateInput): Promise<Store> {
        return this.prisma.store.create({
            data,
        });
    }

    async updateStore(params: {
        where: Prisma.StoreWhereUniqueInput;
        data: Prisma.StoreUpdateInput;
    }): Promise<Store> {
        const { where, data } = params;
        return this.prisma.store.update({
            data,
            where,
        });
    }

    async deleteStore(where: Prisma.StoreWhereUniqueInput): Promise<Store> {
        return this.prisma.store.delete({
            where,
        });
    }
}