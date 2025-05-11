import { Injectable } from '@nestjs/common';
import { CheckoutDto } from './dto/checkout.dto';

@Injectable()
export class CheckoutService {
  constructor() {}

  async checkout(checkoutDto: CheckoutDto): Promise<any> {
    return 0;
  }
}
