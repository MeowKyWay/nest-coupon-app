import { Injectable } from '@nestjs/common';
import { onTops } from './entities/on-top.entity';

@Injectable()
export class OnTopsService {
  findAll() {
    return onTops;
  }

  findOne(id: string) {
    return onTops.find((onTop) => onTop.id === id);
  }
}
