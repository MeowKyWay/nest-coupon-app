import { Module } from '@nestjs/common';
import { CouponsService } from './coupons/coupons.service';
import { OnTopsService } from './on-tops/on-tops.service';
import { SpecialCampaignsService } from './special-campaigns/special-campaigns.service';

@Module({
  providers: [CouponsService, OnTopsService, SpecialCampaignsService],
})
export class CampaignsModule {}
