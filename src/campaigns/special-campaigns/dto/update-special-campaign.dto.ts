import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecialCampaignDto } from './create-special-campaign.dto';

export class UpdateSpecialCampaignDto extends PartialType(CreateSpecialCampaignDto) {}
