import { Module } from '@nestjs/common';
import { LandingpageService } from './landingpage.service';
import { XmlaggregatorService } from 'src/xmlaggregator/xmlaggregator.service';
import { XmlstylenormalizerService } from 'src/xmlstylenormalizer/xmlstylenormalizer.service';

@Module({
  providers: [
    LandingpageService,
    XmlaggregatorService,
    XmlstylenormalizerService,
  ],
})
export class LandingpageModule {}
