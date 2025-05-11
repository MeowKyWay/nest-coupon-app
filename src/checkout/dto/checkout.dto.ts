import { ArrayNotEmpty, IsArray, IsOptional, IsString } from 'class-validator';

export class CheckoutDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  items: string[];

  @IsString()
  @IsOptional()
  coupon?: string;

  @IsString()
  @IsOptional()
  onTop?: string;

  @IsString()
  @IsOptional()
  specialCampaign?: string;
}
