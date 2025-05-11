import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { OnTopsModule } from './campaigns/on-tops/on-tops.module';
import { CouponsModule } from './campaigns/coupons/coupons.module';
import { SpecialCampaignsModule } from './campaigns/special-campaigns/special-campaigns.module';
import { CheckoutModule } from './checkout/checkout.module';
import { CampaignsModule } from './campaigns/campaigns.module';

@Module({
  imports: [
    CouponsModule,
    ItemsModule,
    OnTopsModule,
    SpecialCampaignsModule,
    CheckoutModule,
    CampaignsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
