import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecialCampaignsService } from './special-campaigns.service';
import { CreateSpecialCampaignDto } from './dto/create-special-campaign.dto';
import { UpdateSpecialCampaignDto } from './dto/update-special-campaign.dto';

@Controller('special-campaigns')
export class SpecialCampaignsController {
  constructor(private readonly specialCampaignsService: SpecialCampaignsService) {}

  @Post()
  create(@Body() createSpecialCampaignDto: CreateSpecialCampaignDto) {
    return this.specialCampaignsService.create(createSpecialCampaignDto);
  }

  @Get()
  findAll() {
    return this.specialCampaignsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specialCampaignsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpecialCampaignDto: UpdateSpecialCampaignDto) {
    return this.specialCampaignsService.update(+id, updateSpecialCampaignDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specialCampaignsService.remove(+id);
  }
}
