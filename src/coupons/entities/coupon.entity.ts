import * as json from './coupons.json';

export enum CouponType {
  COUPON = 'COUPON',
  ON_TOP = 'ON_TOP',
  SEASONAL = 'SEASONAL',
}

export enum CouponStrategy {
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED',
  CATEGORY = 'CATEGORY',
  POINTS = 'POINTS',
  SPECIAL = 'SPECIAL',
}

export interface CouponJson {
  code: string;
  type: CouponType;
  strategy: CouponStrategy;
  percentage?: number;
  amount?: number;
  // Add other optional fields as needed for future strategies
}

export abstract class Coupon {
  code: string;
  type: CouponType;

  constructor(code: string, type: CouponType) {
    this.code = code;
    this.type = type;
  }

  abstract discount(param: number): number;

  static fromJson(json: CouponJson): Coupon {
    console.log(json);
    switch (json.strategy) {
      case CouponStrategy.FIXED:
        return new FixedAmountCoupon(json);
      case CouponStrategy.PERCENTAGE:
        return new PercentageCoupon(json);
      default:
        throw new Error(`Unknown coupon strategy: ${json.strategy}`);
    }
  }
}

export class PercentageCoupon extends Coupon {
  private percentage: number;

  constructor({
    code,
    type,
    percentage,
  }: {
    code: string;
    type: CouponType;
    percentage?: number;
  }) {
    percentage = percentage ?? 0;
    if (percentage <= 0 || percentage > 100) {
      throw new Error('Percentage must be between 0 and 100');
    }
    super(code, type);
    this.percentage = percentage;
  }

  discount(price: number): number {
    return ((100 - this.percentage) / 100) * price;
  }
}

export class FixedAmountCoupon extends Coupon {
  private amount: number;

  constructor({ code, amount }: { code: string; amount?: number }) {
    amount = amount ?? 0;
    if (amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }
    super(code, CouponType.COUPON);
    this.amount = amount ?? 0;
  }

  discount(price: number): number {
    return price - this.amount;
  }
}

export const coupons = (json as CouponJson[]).map((coupon: CouponJson) =>
  Coupon.fromJson(coupon),
);
