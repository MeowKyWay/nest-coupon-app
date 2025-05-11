import { Test, TestingModule } from '@nestjs/testing';
import { OnTopsController } from './on-tops.controller';
import { OnTopsService } from './on-tops.service';

describe('OnTopsController', () => {
  let controller: OnTopsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OnTopsController],
      providers: [OnTopsService],
    }).compile();

    controller = module.get<OnTopsController>(OnTopsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
