import { Injectable } from '@nestjs/common';
import { specialCampaigns } from './entities/special-campaign.entity';

@Injectable()
export class SpecialCampaignsService {
  findAll() {
    return specialCampaigns;
  }

  findOne(id: string) {
    return specialCampaigns.find(
      (specialCampaign) => specialCampaign.id === id,
    );
  }
}
