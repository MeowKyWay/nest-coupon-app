import { Injectable } from '@nestjs/common';
import { CreateSpecialCampaignDto } from './dto/create-special-campaign.dto';
import { UpdateSpecialCampaignDto } from './dto/update-special-campaign.dto';

@Injectable()
export class SpecialCampaignsService {
  create(createSpecialCampaignDto: CreateSpecialCampaignDto) {
    return 'This action adds a new specialCampaign';
  }

  findAll() {
    return `This action returns all specialCampaigns`;
  }

  findOne(id: number) {
    return `This action returns a #${id} specialCampaign`;
  }

  update(id: number, updateSpecialCampaignDto: UpdateSpecialCampaignDto) {
    return `This action updates a #${id} specialCampaign`;
  }

  remove(id: number) {
    return `This action removes a #${id} specialCampaign`;
  }
}
