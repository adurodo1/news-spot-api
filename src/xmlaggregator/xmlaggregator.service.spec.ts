import { Test, TestingModule } from '@nestjs/testing';
import { XmlaggregatorService } from './xmlaggregator.service';

describe('XmlaggregatorService', () => {
  let service: XmlaggregatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XmlaggregatorService],
    }).compile();

    service = module.get<XmlaggregatorService>(XmlaggregatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    let a: any = service.FetchData('');
    console.log();
  });
});
