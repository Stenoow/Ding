import { Module } from '@nestjs/common';
import {EnterprisesController} from "./enterprises.controller";
import {EnterprisesService} from "./enterprises.service";
import {PrismaService} from "../prisma.service";
import {StoreModule} from "../Store/store.module";

@Module({
    imports: [StoreModule],
    controllers: [EnterprisesController],
    providers: [EnterprisesService, PrismaService],
})
export class EnterprisesModule {}