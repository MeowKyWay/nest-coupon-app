import { Injectable } from '@nestjs/common';
import { onTops } from './entities/on-top.entity';

@Injectable()
export class OnTopsService {
  findAll() {
    return onTops;
  }
}
