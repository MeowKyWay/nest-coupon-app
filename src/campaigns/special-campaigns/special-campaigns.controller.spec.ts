import { Test, TestingModule } from '@nestjs/testing';
import { SpecialCampaignsController } from './special-campaigns.controller';
import { SpecialCampaignsService } from './special-campaigns.service';

describe('SpecialCampaignsController', () => {
  let controller: SpecialCampaignsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecialCampaignsController],
      providers: [SpecialCampaignsService],
    }).compile();

    controller = module.get<SpecialCampaignsController>(SpecialCampaignsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
