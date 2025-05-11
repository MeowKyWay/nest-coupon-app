import { Injectable } from '@nestjs/common';
import { coupons } from './entities/coupon.entity';

@Injectable()
export class CouponsService {
  findAll() {
    return coupons;
  }

  findOne(id: string) {
    return coupons.find((coupon) => coupon.id === id);
  }
}
