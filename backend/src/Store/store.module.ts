import { Module } from '@nestjs/common';
import {StoreController} from "./store.controller";
import {PrismaService} from "../prisma.service";
import {StoreService} from "./store.service";
import {StockService} from "../Stock/stock.service";

@Module({
    imports: [],
    controllers: [StoreController],
    providers: [StoreService, StockService, PrismaService],
    exports: [StoreService]
})
export class StoreModule {}