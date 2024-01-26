import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs';
import { XmlstylenormalizerService } from 'src/xmlstylenormalizer/xmlstylenormalizer.service';

const sources: Array<{ source: string; link: string }> = [
  { source: 'cnn', link: 'http://rss.cnn.com/rss/cnn_topstories.rss' },
  { source: 'bbc', link: 'https://feeds.bbci.co.uk/news/world/rss.xml' },
  { source: 'al-jazeera', link: 'https://www.aljazeera.com/xml/rss/all.xml' },
  { source: 'cbc', link: 'https://www.cbc.ca/webfeed/rss/rss-topstories' },
  { source: 'globalnews', link: 'https://globalnews.ca/feed' },

  {
    source: 'cnbcmoney',
    link: 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=10000664',
  },

  {
    source: 'espn',
    link: 'https://www.espn.com/espn/rss/news',
  },
  {
    source: 'wallstreet',
    link: 'https://feeds.a.dj.com/rss/RSSMarketsMain.xml',
  },
];

const newsCategory = [
  {
    category: 'politics',

    sources: [
      { source: 'cnn', link: 'http://rss.cnn.com/rss/cnn_topstories.rss' },
      { source: 'bbc', link: 'https://feeds.bbci.co.uk/news/world/rss.xml' },
      {
        source: 'al-jazeera',
        link: 'https://www.aljazeera.com/xml/rss/all.xml',
      },
      { source: 'cbc', link: 'https://www.cbc.ca/webfeed/rss/rss-topstories' },
      { source: 'globalnews', link: 'https://globalnews.ca/feed/' },
    ],
  },

  {
    category: 'finance',

    sources: [
      {
        source: 'cnbcmoney',
        link: 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=10000664',
      },
      {
        source: 'wallstreet',
        link: 'https://feeds.a.dj.com/rss/RSSMarketsMain.xml',
      },
    ],
  },
  //https://feeds.a.dj.com/rss/RSSMarketsMain.xml
  {
    category: 'sports',

    sources: [
      {
        source: 'espn',
        link: 'https://www.espn.com/espn/rss/news',
      },
    ],
  },
];

@Injectable()
export class XmlaggregatorService {
  constructor(private readonly normalizer: XmlstylenormalizerService) {}

  async FetchCategoryData(params: string): Promise<any> {
    let promiseContainer: Array<Promise<XMLResult>> = [];

    let selectedSource = newsCategory.find((s) => s.category === params);

    selectedSource.sources.map((item) => {
      const promiseHolder = new Promise<XMLResult>(async (resolve, reject) => {
        let results: Response;
        let source: string;

        try {
          results = await fetch(item.link);
          source = item.source;
        } catch (err) {
          throw new Error('err');
        }
        resolve({ results, source });
      });
      promiseContainer.push(promiseHolder);
    });

    let results: Array<Promise<XMLResult>> | Array<XMLResult> =
      await Promise.all(promiseContainer).then((values) => {
        return values;
      });

    return this.normalizer.GroupNormalize(results);
  }

  async FetchData(params: string): Promise<any> {
    let promiseContainer: Array<Promise<XMLResult>> = [];

    let selectedSource = sources.find((s) => s.source === params);

    const promiseHolder = new Promise<XMLResult>(async (resolve, reject) => {
      let results: Response = await fetch(selectedSource.link);
      let source: string = selectedSource.source;
      resolve({ results, source });
    });
    promiseContainer.push(promiseHolder);

    let results: Array<Promise<XMLResult>> | Array<XMLResult> =
      await Promise.all(promiseContainer).then((values) => {
        return values;
      });

    return this.normalizer.Normalize(results);
  }
}
