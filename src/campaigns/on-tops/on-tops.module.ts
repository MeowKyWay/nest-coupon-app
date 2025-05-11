import { Module } from '@nestjs/common';
import { OnTopsService } from './on-tops.service';
import { OnTopsController } from './on-tops.controller';

@Module({
  controllers: [OnTopsController],
  providers: [OnTopsService],
})
export class OnTopsModule {}
