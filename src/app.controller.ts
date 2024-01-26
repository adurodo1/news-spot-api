import { Controller, Get, Header, Res, StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';
import { Response as ExpressResponse } from 'express';
import { join } from 'path';
import path from 'path';
import { createReadStream } from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('xslfile')
  @Header('Content-Type', 'text/xml')
  getXslFile(@Res({ passthrough: true }) res: ExpressResponse): any {
    const file = createReadStream(join(process.cwd(), 'src/newsItem.xsl'));
    // file.pipe(res);
    return new StreamableFile(file);
  }

  @Get('xslfileforcategories')
  @Header('Content-Type', 'text/xml')
  getXslFileForCategories(
    @Res({ passthrough: true }) res: ExpressResponse,
  ): any {
    const file = createReadStream(join(process.cwd(), 'src/groupnewsitem.xsl'));
    // file.pipe(res);
    return new StreamableFile(file);
  }
}
