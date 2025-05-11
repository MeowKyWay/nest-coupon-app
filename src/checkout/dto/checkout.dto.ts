import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class CheckoutDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  items: string[];

  @IsArray()
  @IsString({ each: true })
  campaigns: string[];
}
