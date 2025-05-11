import * as json from './special-campaigns.json';

import {
  applyProportionalDiscount,
  Campaign,
} from 'src/campaigns/entities/campaign';
import { Item } from 'src/items/entities/item.entity';

export interface SpecialCampaignJson {
  id: string;
  every: number;
  amount: number;
}

export class SpecialCampaign extends Campaign {
  public readonly every: number;
  public readonly amount: number;

  constructor({ every, id, amount }: SpecialCampaignJson) {
    super('Special Campaign', id);
    if (every <= 0) {
      throw new Error('Every must be greater than 0');
    }
    if (amount <= 0) {
      throw new Error('Discount must be greater than 0');
    }
    this.every = every;
    this.amount = amount;
  }

  discount({ items }: { items: Item[] }): Item[] {
    const totalPrice = items.reduce((acc, item) => acc + item.price, 0);
    const discountAmount = Math.floor(totalPrice / this.every) * this.amount;

    return applyProportionalDiscount(items, discountAmount);
  }
}

export const specialCampaigns: SpecialCampaign[] = json.map(
  (specialCampaignJson: SpecialCampaignJson) =>
    new SpecialCampaign(specialCampaignJson),
);
