import { Injectable, NotFoundException } from '@nestjs/common';
import { coupons } from './entities/coupon.entity';

@Injectable()
export class CouponsService {
  findAll() {
    return coupons;
  }

  findOne(code: string) {
    const coupon = coupons.find((coupon) => coupon.code === code);
    if (!coupon) {
      throw new NotFoundException(`Coupon with code ${code} not found`);
    }
    return coupon;
  }
}
