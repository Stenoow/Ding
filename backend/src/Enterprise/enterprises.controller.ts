import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Delete,
} from '@nestjs/common';
import { Enterprises as EnterprisesModel } from '@prisma/client';
import {EnterprisesService} from "./enterprises.service";

@Controller()
export class EnterprisesController {
    constructor(
        private readonly enterpriseService: EnterprisesService,
    ) {}

    @Get('enterprise/:id')
    async getEnterpriseById(@Param('id') id: string): Promise<EnterprisesModel> {
        return this.enterpriseService.enterprise({ id: Number(id) });
    }

    @Get('enterprises')
    async getAllEnterprises(): Promise<EnterprisesModel[]> {
        return this.enterpriseService.enterprises({});
    }

    @Post('enterprise/create')
    async createEnterprise(@Body() enterpriseData: { name: string }): Promise<EnterprisesModel> {
        const { name } = enterpriseData;
        return this.enterpriseService.createEnterprise({
            name,
        });
    }

    @Post('enterprise/update')
    async updateEnterprise(@Body() enterpriseData: { id: number, name: string }): Promise<EnterprisesModel> {
        return this.enterpriseService.updateEnterprise({
            where: { id: Number(enterpriseData.id) },
            data: { name: enterpriseData.name },
        });
    }

    @Delete('enterprise/:id')
    async deleteEnterprise(@Param('id') id: string): Promise<EnterprisesModel> {
        return this.enterpriseService.deleteEnterprise({ id: Number(id) });
    }
}
