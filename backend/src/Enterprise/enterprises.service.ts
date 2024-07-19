import { Injectable } from '@nestjs/common';
import { Prisma, Enterprises } from '@prisma/client';
import {PrismaService} from "../prisma.service";

@Injectable()
export class EnterprisesService {
    constructor(private prisma: PrismaService) {}

    async enterprise( enterpriseWhereUniqueInput: Prisma.EnterprisesWhereUniqueInput ): Promise<Enterprises | null> {
        return this.prisma.enterprises.findUnique({
            where: enterpriseWhereUniqueInput,
        });
    }

    async enterprises(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.EnterprisesWhereUniqueInput;
        where?: Prisma.EnterprisesWhereInput;
        orderBy?: Prisma.EnterprisesOrderByWithRelationInput;
    }): Promise<Enterprises[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.enterprises.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createEnterprise(data: Prisma.EnterprisesCreateInput): Promise<Enterprises> {
        return this.prisma.enterprises.create({
            data,
        });
    }

    async updateEnterprise(params: {
        where: Prisma.EnterprisesWhereUniqueInput;
        data: Prisma.EnterprisesUpdateInput;
    }): Promise<Enterprises> {
        const { where, data } = params;
        return this.prisma.enterprises.update({
            data,
            where,
        });
    }

    async deleteEnterprise(where: Prisma.EnterprisesWhereUniqueInput): Promise<Enterprises> {
        return this.prisma.enterprises.delete({
            where,
        });
    }
}