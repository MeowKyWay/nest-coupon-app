import {
  applyProportionalDiscount,
  Campaign,
} from 'src/campaigns/entities/campaign';
import * as json from './on-tops.json';
import { Item, ItemCategory } from 'src/items/entities/item.entity';

export enum OnTopStrategy {
  CATEGORY_PERCENTAGE = 'CATEGORY_PERCENTAGE',
  POINTS = 'POINTS',
}

export interface OnTopJson {
  id: string;
  strategy: OnTopStrategy;
  amount?: number;
  category?: ItemCategory;
  points?: number;
}

export abstract class OnTop extends Campaign {
  constructor(name: string, id: string) {
    super(name, id);
  }

  static fromJson(json: OnTopJson): OnTop {
    switch (json.strategy) {
      case OnTopStrategy.CATEGORY_PERCENTAGE:
        return new CategoryPercentageOnTop(json);
      case OnTopStrategy.POINTS:
        return new PointsOnTop(json);
      default:
        throw new Error('Invalid on-top strategy');
    }
  }
}

export class CategoryPercentageOnTop extends OnTop {
  public readonly amount: number;
  public readonly category: ItemCategory;

  constructor({
    amount,
    id,
    category,
  }: {
    amount?: number;
    id: string;
    category?: ItemCategory;
  }) {
    amount = amount ?? 0;
    if (amount <= 0 || amount > 100) {
      throw new Error('Percentage must be between 0 and 100');
    }
    if (!category) {
      throw new Error('Category is required');
    }
    super('Percentage discount by item category', id);
    this.amount = amount;
    this.category = category;
  }

  /**
   * Applies a percentage discount to a list of items.
   * Ensures no item's price falls below zero after applying the discount.
   *
   * @param items - The list of items to apply the discount to.
   * @returns A new list of items with updated (discounted) prices.
   */
  discount({ items }: { items: Item[] }): Item[] {
    return items.map((item) => {
      if (item.category === this.category) {
        const discountAmount = (item.price * this.amount) / 100;
        const discountedPrice = item.price - discountAmount;
        return new Item({
          ...item,
          price: Math.max(discountedPrice, 0), // Ensure price does not go below zero
        });
      }
      return new Item({ ...item });
    });
  }
}

export class PointsOnTop extends OnTop {
  public readonly point: number;

  constructor({ points, id }: { points?: number; id: string }) {
    points = points ?? 0;
    super('Discount by points', id);
    if (points <= 0) {
      throw new Error('Point must be greater than 0');
    }
    this.point = points;
  }

  /**
   * Applies a point-based discount to a list of items.
   * The discount is distributed proportionally based on each item's price.
   *
   * @param items - The list of items to apply the discount to.
   * @returns A new list of items with updated prices.
   */
  discount({ items }: { items: Item[] }): Item[] {
    if (this.point <= 0) {
      return items.map((item) => new Item({ ...item })); // No discount applied
    }

    const totalPrice = items.reduce((acc, item) => acc + item.price, 0);

    const cappedPoint = Math.min(totalPrice * 0.2, this.point); // Cap the discount to 20% of total price

    return applyProportionalDiscount(items, cappedPoint);
  }
}

export const onTops: OnTop[] = (json as OnTopJson[]).map((onTop: OnTopJson) =>
  OnTop.fromJson(onTop),
);
