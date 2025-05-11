import { Injectable, NotFoundException } from '@nestjs/common';
import { items } from './entities/item.entity';

@Injectable()
export class ItemsService {
  findAll() {
    return items;
  }

  findOne(id: string) {
    const item = items.find((item) => item.id === id);
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }
}
