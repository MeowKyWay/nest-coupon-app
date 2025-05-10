import { DiscountCampaign } from 'src/discount/discount-campaign';
import * as json from './coupons.json';
import { Item } from 'src/items/entities/item.entity';

export enum CouponStrategy {
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED',
}

export interface CouponJson {
  code: string;
  strategy: CouponStrategy;
  amount: number;
}

export abstract class Coupon extends DiscountCampaign {
  code: string;

  constructor(code: string) {
    super();
    this.code = code;
  }

  abstract discount(items: Item[]): Item[];

  static fromJson(json: CouponJson): Coupon {
    console.log(json);
    switch (json.strategy) {
      case CouponStrategy.FIXED:
        return new FixedAmountCoupon(json);
      case CouponStrategy.PERCENTAGE:
        return new PercentageCoupon(json);
      default:
        throw new Error('Invalid coupon strategy');
    }
  }
}

export class PercentageCoupon extends Coupon {
  name = 'Percentage discount';
  private amount: number;

  constructor({ code, amount }: { code: string; amount?: number }) {
    amount = amount ?? 0;
    if (amount <= 0 || amount > 100) {
      throw new Error('Amount must be between 0 and 100');
    }
    super(code);
    this.amount = amount;
  }

  /**
   * Applies a percentage discount to a list of items.
   * Ensures no item's price falls below zero after applying the discount.
   *
   * @param items - The list of items to apply the discount to.
   * @returns A new list of items with updated (discounted) prices.
   * @example
   * const items = [
   *   new Item('1', 'Item A', 100, ItemCategory.CLOTHING),
   *   new Item('2', 'Item B', 200, ItemCategory.FOOD),
   * ];
   * const discounted = coupon.discount(items);
   * // Each item will have a percentage discount applied, and the price will not go below zero.
   */
  discount(items: Item[]): Item[] {
    return items.map((item) => {
      const discountAmount = (item.price * this.amount) / 100;
      const discountedPrice = item.price - discountAmount;
      return new Item({
        ...item,
        price: Math.max(discountedPrice, 0), // Ensure price does not go below zero
      });
    });
  }
}

export class FixedAmountCoupon extends Coupon {
  name = 'Fixed amount';
  private amount: number;

  constructor({ code, amount }: { code: string; amount?: number }) {
    amount = amount ?? 0;
    if (amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }
    super(code);
    this.amount = amount ?? 0;
  }

  /**
   * Applies a fixed amount discount proportionally across all items based on their price.
   * Ensures no item's price falls below zero.
   *
   * @param items - The list of items to apply the discount to.
   * @returns A new list of items with updated (discounted) prices.
   *
   * @example
   * const items = [new Item({ price: 100 }), new Item({ price: 200 })];
   * const discounted = coupon.discount(items);
   * // Discounts are applied in proportion to item prices
   */
  discount(items: Item[]): Item[] {
    const totalPrice = items.reduce((acc, item) => acc + item.price, 0);

    if (totalPrice <= 0) {
      return items.map((item) => new Item({ ...item, price: 0 })); // Ensure all items are zero if total price is zero
    }

    return items.map((item) => {
      const discountAmount = (item.price / totalPrice) * this.amount;
      const discountedPrice = item.price - discountAmount;
      return new Item({
        ...item,
        price: Math.max(discountedPrice, 0), // Ensure price does not go below zero
      });
    });
  }
}

export const coupons = (json as CouponJson[]).map((coupon: CouponJson) =>
  Coupon.fromJson(coupon),
);
