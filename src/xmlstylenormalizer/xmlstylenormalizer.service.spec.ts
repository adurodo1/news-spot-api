import { Test, TestingModule } from '@nestjs/testing';
import { XmlstylenormalizerService } from './xmlstylenormalizer.service';

describe('XmlstylenormalizerService', () => {
  let service: XmlstylenormalizerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XmlstylenormalizerService],
    }).compile();

    service = module.get<XmlstylenormalizerService>(XmlstylenormalizerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
