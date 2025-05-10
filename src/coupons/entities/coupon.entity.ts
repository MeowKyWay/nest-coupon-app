import * as json from './coupons.json';

export enum CouponType {
  COUPON = 'COUPON',
  ON_TOP = 'ON_TOP',
  SEASONAL = 'SEASONAL',
}

export enum CouponCampaign {
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED',
  CATEGORY = 'CATEGORY',
  POINTS = 'POINTS',
  SPECIAL = 'SPECIAL',
}

export interface CouponJson {
  code: string;
  type: CouponType;
  campaign: CouponCampaign;
  percentage?: number;
  amount?: number;
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
    switch (json.campaign) {
      case CouponCampaign.FIXED:
        return new FixedAmountCoupon(json);
      case CouponCampaign.PERCENTAGE:
        return new PercentageCoupon(json);
      default:
        throw new Error(`Unknown coupon strategy: ${json.campaign}`);
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
