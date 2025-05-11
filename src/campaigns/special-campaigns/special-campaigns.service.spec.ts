import { Test, TestingModule } from '@nestjs/testing';
import { SpecialCampaignsService } from './special-campaigns.service';

describe('SpecialCampaignsService', () => {
  let service: SpecialCampaignsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecialCampaignsService],
    }).compile();

    service = module.get<SpecialCampaignsService>(SpecialCampaignsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
