import { Injectable, NotFoundException } from '@nestjs/common';
import { specialCampaigns } from './entities/special-campaign.entity';

@Injectable()
export class SpecialCampaignsService {
  findAll() {
    return specialCampaigns;
  }

  findOne(id: string) {
    const specialCampaign = specialCampaigns.find(
      (specialCampaign) => specialCampaign.id === id,
    );
    if (!specialCampaign) {
      throw new NotFoundException(`Special Campaign with ID ${id} not found`);
    }
    return specialCampaign;
  }
}
