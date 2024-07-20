import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Delete,
} from '@nestjs/common';
import { Store as StoreModel } from '@prisma/client';
import {StoreService} from "./store.service";

@Controller()
export class StoreController {
    constructor(
        private readonly storeService: StoreService
    ) {}

    @Get('store/:id')
    async getStoreById(@Param('id') id: string): Promise<StoreModel> {
        return this.storeService.store({ id: Number(id) });
    }

    @Get('stores')
    async getAllStores(): Promise<StoreModel[]> {
        return this.storeService.stores({});
    }

    @Post('store/create')
    async createStore(@Body() storeData: { name: string, enterpriseId: number }): Promise<StoreModel> {
        const { name, enterpriseId } = storeData;
        return this.storeService.createStore({
            name,
            enterprise: {
                connect: {id: Number(enterpriseId)},
            }
        });
    }

    @Post('store/update')
    async updateStore(@Body() storeData: { id: number, name: string, enterpriseId: number }): Promise<StoreModel> {
        return this.storeService.updateStore({
            where: { id: Number(storeData.id) },
            data: { name: storeData.name, enterprise: {connect: {id: Number(storeData.enterpriseId)}} },
        });
    }

    @Delete('store/:id')
    async deleteStore(@Param('id') id: string): Promise<StoreModel> {
        return this.storeService.deleteStore({ id: Number(id) });
    }
}
