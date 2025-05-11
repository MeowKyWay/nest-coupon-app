export class CheckoutResponseDto {
  items: Array<{
    productId: string;
    price: number;
  }>;
  totalDiscount: number;
  totalPrice: number;
}
