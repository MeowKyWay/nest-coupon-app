import * as json from './items.json';

export enum ItemCategory {
  CLOTHING = 'CLOTHING',
  ASSESSORIES = 'ACCESSORIES',
  ELECTRONICS = 'ELECTRONICS',
}

export interface ItemJson {
  name: string;
  price: number;
  category: ItemCategory;
}

export class Item {
  id: string;
  name: string;
  price: number;
  category: ItemCategory;

  static nextId = 1;

  constructor({ name, price, category }: ItemJson) {
    this.id = Item.nextId.toString();
    Item.nextId += 1;
    this.name = name;
    this.price = price;
    this.category = category;
  }

  static fromJson(json: ItemJson): Item {
    return new Item(json);
  }
}

export const items: Item[] = (json as ItemJson[]).map((item) =>
  Item.fromJson(item),
);
