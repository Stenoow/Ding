import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {EnterprisesModule} from "./Enterprise/enterprises.module";

@Module({
  imports: [EnterprisesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
