import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LandingpageController } from './landingpage/landingpage.controller';
import { LandingpageModule } from './landingpage/landingpage.module';
import { XmlaggregatorService } from './xmlaggregator/xmlaggregator.service';
import { XmlstylenormalizerService } from './xmlstylenormalizer/xmlstylenormalizer.service';

@Module({
  imports: [LandingpageModule],
  controllers: [AppController, LandingpageController],
  providers: [AppService, XmlaggregatorService, XmlstylenormalizerService],
})
export class AppModule {}
