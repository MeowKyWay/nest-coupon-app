import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CouponsModule } from './coupons/coupons.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [CouponsModule, ItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
