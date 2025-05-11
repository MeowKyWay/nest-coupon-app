import { Injectable, NotFoundException } from '@nestjs/common';
import { onTops } from './entities/on-top.entity';

@Injectable()
export class OnTopsService {
  findAll() {
    return onTops;
  }

  findOne(id: string) {
    const onTop = onTops.find((onTop) => onTop.id === id);
    if (!onTop) {
      throw new NotFoundException(`OnTop with ID ${id} not found`);
    }
    return onTop;
  }
}
