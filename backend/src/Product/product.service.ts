import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Product } from '@prisma/client';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    async product( productWhereUniqueInput: Prisma.ProductWhereUniqueInput ): Promise<Product | null> {
        return this.prisma.product.findUnique({
            where: productWhereUniqueInput,
        });
    }

    async products(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ProductWhereUniqueInput;
        where?: Prisma.ProductWhereInput;
        orderBy?: Prisma.ProductOrderByWithRelationInput;
    }): Promise<Product[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.product.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
        return this.prisma.product.create({
            data,
        });
    }

    async updateProduct(params: {
        where: Prisma.ProductWhereUniqueInput;
        data: Prisma.ProductUpdateInput;
    }): Promise<Product> {
        const { where, data } = params;
        return this.prisma.product.update({
            data,
            where,
        });
    }

    async deleteProduct(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
        const productId = where.id;

        // Utilisation d'une transaction pour supprimer les stocks puis le produit
        return this.prisma.$transaction(async (prisma) => {
            // Supprimer tous les stocks associés au produit
            await prisma.stock.deleteMany({
                where: {
                    productId: productId,
                },
            });

            // Supprimer le produit
            return prisma.product.delete({
                where,
            });
        });
    }

    async getProductWithMaxQuantity(): Promise<Product | null> {
        // Trouver tous les produits avec les quantités de stock
        const productsWithQuantities = await this.prisma.product.findMany({
            include: {
                stocks: {
                    select: { quantity: true },
                },
            },
        });

        // Vérifier si nous avons des produits
        if (productsWithQuantities.length === 0) {
            return null;
        }

        // Calculer la quantité totale pour chaque produit
        const productQuantities = productsWithQuantities.map(product => {
            const totalQuantity = product.stocks.reduce((sum, stock) => sum + stock.quantity, 0);
            return { ...product, totalQuantity };
        });

        // Trouver le produit avec la quantité totale maximale
        const productWithMaxQuantity = productQuantities.reduce((maxProduct, product) => {
            if (product.totalQuantity > maxProduct.totalQuantity) {
                return product;
            }
            return maxProduct;
        }, productQuantities[0]);

        // Retourner uniquement les propriétés du modèle Product
        const { totalQuantity, ...productWithoutTotalQuantity } = productWithMaxQuantity;

        return productWithoutTotalQuantity;
    }
}