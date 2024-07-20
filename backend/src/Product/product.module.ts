import { Module } from '@nestjs/common';
import {ProductController} from "./product.controller";
import {PrismaService} from "../prisma.service";
import {ProductService} from "./product.service";

@Module({
    imports: [],
    controllers: [ProductController],
    providers: [ProductService, PrismaService],
})
export class ProductModule {}