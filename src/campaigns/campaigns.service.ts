import { Injectable, NotFoundException } from '@nestjs/common';
import { CouponsService } from './coupons/coupons.service';
import { OnTopsService } from './on-tops/on-tops.service';
import { SpecialCampaignsService } from './special-campaigns/special-campaigns.service';

@Injectable()
export class CampaignsService {
  constructor(
    private readonly couponsService: CouponsService,
    private readonly onTopsService: OnTopsService,
    private readonly specialCampaignsService: SpecialCampaignsService,
  ) {}

  /**
   * Get all campaigns (coupons, on-top, special campaigns)
   * @returns {Campaign[]} The list of all campaigns sorted by ID.
   */
  findAll() {
    const allCampaigns = [
      ...this.couponsService.findAll(),
      ...this.onTopsService.findAll(),
      ...this.specialCampaignsService.findAll(),
    ];
    return allCampaigns.sort((a, b) => a.id.localeCompare(b.id));
  }

  /**
   * Get a specific campaign by its ID.
   * @param {string} id - The campaign ID.
   * @returns {Campaign} The campaign with the specified ID.
   * @throws {NotFoundException} If no campaign with the specified ID exists.
   */
  findOne(id: string) {
    const campaign =
      this.couponsService.findOne(id) ||
      this.onTopsService.findOne(id) ||
      this.specialCampaignsService.findOne(id);

    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }

    return campaign;
  }
}
