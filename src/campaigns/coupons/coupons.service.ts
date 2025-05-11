import { Injectable } from '@nestjs/common';
import { coupons } from './entities/coupon.entity';

@Injectable()
export class CouponsService {
  findAll() {
    return coupons;
  }
}
