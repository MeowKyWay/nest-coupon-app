import { Test, TestingModule } from '@nestjs/testing';
import { OnTopsService } from './on-tops.service';

describe('OnTopsService', () => {
  let service: OnTopsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OnTopsService],
    }).compile();

    service = module.get<OnTopsService>(OnTopsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
