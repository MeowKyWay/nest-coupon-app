import { Injectable } from '@nestjs/common';
import { items } from './entities/item.entity';

@Injectable()
export class ItemsService {
  findAll() {
    return items;
  }
}
