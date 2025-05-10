import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { OnTopsModule } from './discount/on-tops/on-tops.module';
import { CouponsModule } from './discount/coupons/coupons.module';

@Module({
  imports: [CouponsModule, ItemsModule, OnTopsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
