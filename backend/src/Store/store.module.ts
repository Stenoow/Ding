import { Module } from '@nestjs/common';
import {StoreController} from "./store.controller";
import {PrismaService} from "../prisma.service";
import {StoreService} from "./store.service";

@Module({
    imports: [],
    controllers: [StoreController],
    providers: [StoreService, PrismaService],
})
export class StoreModule {}