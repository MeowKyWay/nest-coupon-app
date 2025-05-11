import * as json from './items.json';

export enum ItemCategory {
  CLOTHING = 'CLOTHING',
  ASSESSORIES = 'ACCESSORIES',
  ELECTRONICS = 'ELECTRONICS',
}

export interface ItemJson {
  id: string;
  name: string;
  price: number;
  category: ItemCategory;
}

export class Item {
  id: string;
  name: string;
  price: number;
  category: ItemCategory;

  constructor({ name, id, price, category }: ItemJson) {
    this.id = id;
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
