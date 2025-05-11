import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { CouponsService } from 'src/campaigns/coupons/coupons.service';
import { OnTopsService } from 'src/campaigns/on-tops/on-tops.service';
import { SpecialCampaignsService } from 'src/campaigns/special-campaigns/special-campaigns.service';
import { ItemsService } from 'src/items/items.service';

@Module({
  controllers: [CheckoutController],
  providers: [
    CheckoutService,
    ItemsService,
    CouponsService,
    OnTopsService,
    SpecialCampaignsService,
  ],
})
export class CheckoutModule {}
