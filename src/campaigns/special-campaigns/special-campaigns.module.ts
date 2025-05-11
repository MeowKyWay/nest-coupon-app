import { Module } from '@nestjs/common';
import { SpecialCampaignsService } from './special-campaigns.service';
import { SpecialCampaignsController } from './special-campaigns.controller';

@Module({
  controllers: [SpecialCampaignsController],
  providers: [SpecialCampaignsService],
})
export class SpecialCampaignsModule {}
