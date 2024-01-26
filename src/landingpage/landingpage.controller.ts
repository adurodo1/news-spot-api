import { Controller, Get, Header, Req, Res, Param } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { create, fragment } from 'xmlbuilder2';
import { XmlaggregatorService } from 'src/xmlaggregator/xmlaggregator.service';

@Controller('news')
export class LandingpageController {
  constructor(private readonly xml: XmlaggregatorService) {}
  @Get('/:source')
  @Header('Content-Type', 'text/xml')
  async GetAllNews(
    @Param() params: any,
    @Res({ passthrough: true }) res: ExpressResponse,
  ) {
    let a: XMLResult = await this.xml.FetchData(params.source);
    return a.results;
  }

  @Get('/group/:type')
  @Header('Content-Type', 'text/xml')
  async GetGroupedNews(
    @Param() params: any,
    @Res({ passthrough: true }) res: ExpressResponse,
  ) {
    let a: any = await this.xml.FetchCategoryData(params.type);
    return a.root;
  }
}
