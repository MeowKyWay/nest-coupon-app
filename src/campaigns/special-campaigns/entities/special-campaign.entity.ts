import {
  applyProportionalDiscount,
  DiscountCampaign,
} from 'src/campaigns/discount-campaign';
import { Item } from 'src/items/entities/item.entity';

export interface SpecialCampaignJson {
  every: number;
  amount: number;
}

export class SpecialCampaign extends DiscountCampaign {
  public readonly every: number;
  public readonly amount: number;

  constructor({ every, amount }: SpecialCampaignJson) {
    super('Special Campaign');
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
