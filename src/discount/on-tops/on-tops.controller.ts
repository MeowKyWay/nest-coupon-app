import { Controller, Get } from '@nestjs/common';
import { OnTopsService } from './on-tops.service';

@Controller('on-tops')
export class OnTopsController {
  constructor(private readonly onTopsService: OnTopsService) {}

  @Get()
  findAll() {
    return this.onTopsService.findAll();
  }
}
