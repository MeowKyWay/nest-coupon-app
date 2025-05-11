import { Controller, Get } from '@nestjs/common';
import { SpecialCampaignsService } from './special-campaigns.service';

@Controller('special-campaigns')
export class SpecialCampaignsController {
  constructor(
    private readonly specialCampaignsService: SpecialCampaignsService,
  ) {}

  @Get()
  findAll() {
    return this.specialCampaignsService.findAll();
  }
}
