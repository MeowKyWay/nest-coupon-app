import { Body, Controller, Post } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutDto } from './dto/checkout.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  async checkout(@Body() checkoutDto: CheckoutDto) {
    const result = await this.checkoutService.checkout(checkoutDto);
    return result;
  }
}
