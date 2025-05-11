import { Injectable } from '@nestjs/common';
import { CheckoutDto } from './dto/checkout.dto';
import { CheckoutResponseDto } from './dto/checkout-response.dto';
import { Item } from 'src/items/entities/item.entity';
import { ItemsService } from 'src/items/items.service';
import { Coupon } from 'src/campaigns/coupons/entities/coupon.entity';
import { OnTop } from 'src/campaigns/on-tops/entities/on-top.entity';
import { SpecialCampaign } from 'src/campaigns/special-campaigns/entities/special-campaign.entity';
import { CouponsService } from 'src/campaigns/coupons/coupons.service';
import { OnTopsService } from 'src/campaigns/on-tops/on-tops.service';
import { SpecialCampaignsService } from 'src/campaigns/special-campaigns/special-campaigns.service';

@Injectable()
export class CheckoutService {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly couponsService: CouponsService,
    private readonly onTopsService: OnTopsService,
    private readonly specialCampaignsService: SpecialCampaignsService,
  ) {}

  checkout(checkoutDto: CheckoutDto): CheckoutResponseDto {
    const items: Item[] = [];
    let coupon: Coupon;
    let onTop: OnTop;
    let specialCampaign: SpecialCampaign;

    for (const id of checkoutDto.items) {
      items.push(this.itemsService.findOne(id));
    }

    const totalPriceBeforeDiscount = items.reduce(
      (acc, item) => acc + item.price,
      0,
    );

    let itemsAfterDiscounts = [...items];

    if (checkoutDto.coupon) {
      coupon = this.couponsService.findOne(checkoutDto.coupon);
      itemsAfterDiscounts = coupon.discount({ items: itemsAfterDiscounts });
    }
    if (checkoutDto.onTop) {
      onTop = this.onTopsService.findOne(checkoutDto.onTop);
      itemsAfterDiscounts = onTop.discount({ items: itemsAfterDiscounts });
    }
    if (checkoutDto.specialCampaign) {
      specialCampaign = this.specialCampaignsService.findOne(
        checkoutDto.specialCampaign,
      );
      itemsAfterDiscounts = specialCampaign.discount({
        items: itemsAfterDiscounts,
      });
    }

    const totalPriceAfterDiscount = itemsAfterDiscounts.reduce(
      (acc, item) => acc + item.price,
      0,
    );

    const response: CheckoutResponseDto = {
      itemsBeforeDiscount: items,
      totalPriceBeforeDiscount: totalPriceBeforeDiscount,
      itemsAfterDiscount: itemsAfterDiscounts,
      totalDiscount: totalPriceBeforeDiscount - totalPriceAfterDiscount,
      totalPriceAfterDiscount: totalPriceAfterDiscount,
    };

    return response;
  }
}
