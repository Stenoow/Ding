import { Module } from '@nestjs/common';
import {EnterprisesController} from "./enterprises.controller";
import {EnterprisesService} from "./enterprises.service";
import {PrismaService} from "../prisma.service";

@Module({
    imports: [],
    controllers: [EnterprisesController],
    providers: [EnterprisesService, PrismaService],
})
export class EnterprisesModule {}