import { Item } from 'src/items/entities/item.entity';

export abstract class Campaign {
  private static nextId = 1;

  public readonly id: string;
  public readonly name: string;

  constructor(name: string) {
    this.id = Campaign.nextId.toString();
    Campaign.nextId += 1;
    this.name = name;
  }

  /**
   * Applies a fixed discount evenly across all items.
   * Ensures item prices do not go below zero.
   *
   * @param items - The list of items to apply the discount to.
   * @returns The updated list of items with discounted prices.
   *
   * @warning This method should not modify the original items array.
   */
  abstract discount({
    items,
    point,
  }: {
    items: Item[];
    point?: number;
  }): Item[];
}

export function applyProportionalDiscount(
  items: Item[],
  totalDiscount: number,
): Item[] {
  const totalPrice = items.reduce((acc, item) => acc + item.price, 0);

  if (totalPrice <= 0) {
    return items.map((item) => new Item({ ...item, price: 0 }));
  }

  return items.map((item) => {
    const discountAmount = (item.price / totalPrice) * totalDiscount;
    const discountedPrice = item.price - discountAmount;
    return new Item({
      ...item,
      price: Math.max(discountedPrice, 0), // Ensure price of each item does not go below zero
    });
  });
}
