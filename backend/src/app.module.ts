import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {EnterprisesModule} from "./Enterprise/enterprises.module";
import {StoreModule} from "./Store/store.module";
import {ProductModule} from "./Product/product.module";
import {StockModule} from "./Stock/stock.module";

@Module({
  imports: [EnterprisesModule, StoreModule, ProductModule, StockModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
