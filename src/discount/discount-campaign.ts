import { Item } from 'src/items/entities/item.entity';

export abstract class DiscountCampaign {
  /**
   * Applies a fixed discount evenly across all items.
   * Ensures item prices do not go below zero.
   *
   * @param items - The list of items to apply the discount to.
   * @returns The updated list of items with discounted prices.
   *
   * @warning This method should not modify the original items array.
   */
  abstract discount(items: Item[]): Item[];

  abstract name: string;
}
