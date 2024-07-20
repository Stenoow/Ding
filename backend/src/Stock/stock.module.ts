import { Module } from '@nestjs/common';
import {StockController} from "./stock.controller";
import {PrismaService} from "../prisma.service";
import {StockService} from "./stock.service";

@Module({
    imports: [],
    controllers: [StockController],
    providers: [StockService, PrismaService],
})
export class StockModule {}