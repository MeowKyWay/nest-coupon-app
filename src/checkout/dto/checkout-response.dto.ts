export class CheckoutResponseDto {
  itemsBeforeDiscount: Array<{
    name: string;
    price: number;
  }>;
  totalPriceBeforeDiscount: number;
  itemsAfterDiscount: Array<{
    name: string;
    price: number;
  }>;
  totalDiscount: number;
  totalPriceAfterDiscount: number;
}
