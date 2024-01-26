import { Injectable } from '@nestjs/common';
import { create, fragment } from 'xmlbuilder2';
@Injectable()
export class XmlstylenormalizerService {
  private bbc: Promise<NewsSource>;
  private cnn: Promise<NewsSource>;
  private aj: Promise<NewsSource>;
  private cbc: Promise<NewsSource>;
  private news: Promise<NewsSource>;

  async ClassifySource(response: Array<Promise<XMLResult>> | Array<XMLResult>) {
    for (let index = 0; index < response.length; index++) {
      const element = await response[index];

      this.news = this.reconstructElements(element);
      /* 
      if (element.source === 'bbc') {
        this.bbc = this.reconstructElements(element);
      } else if (element.source === 'cnn') {
        this.cnn = this.reconstructElements(element);
      } else if (element.source === 'aljazeera') {
        this.aj = this.reconstructElements(element);
      } else if (element.source === 'cbc') {
        this.cbc = this.reconstructElements(element);
        // console.log(await this.cbc);
      } else {
      }
      */
    }

    return {
      bbc: this.bbc,
      cnn: this.cnn,
      aljazeera: this.aj,
      cbc: this.cbc,
      news: this.news,
    };
  }

  async GroupClassifySource(
    response: Array<Promise<XMLResult>> | Array<XMLResult>,
  ) {
    let combinedresults: any;
    let root = create({}).ele('root');

    for (let index = 0; index < response.length; index++) {
      const element = await response[index];
      combinedresults = (await this.GroupReconstructElements(element)).results;
      root.ele(combinedresults).up;
    }

    return {
      root: root.toString(),
    };
  }

  async reconstructElements(source: XMLResult) {
    let xml = await source;

    const doc2 = fragment(await xml.results.text());

    let allnodes = fragment({ encoding: 'UTF-8' });
    doc2.map(
      (n) => {
        if (n.node.nodeName === 'item') {
          if (source.source === 'cbc') {
            n.removeAtt('https://www.cbc.ca/rss/cbc', 'type');
            n.removeAtt('https://www.cbc.ca/rss/cbc', 'deptid');
            n.removeAtt('https://www.cbc.ca/rss/cbc', 'syndicate');
            allnodes.import(n);
          } else {
            allnodes.import(n);
          }
        }
        // return n.toString();
      },
      true,
      true,
    );
    let root;
    root = create({}).ele('root').import(allnodes);
    //root.import(allnodes);

    let temp: NewsSource = {
      source: xml.source,
      results: root.toString(),
    };
    return temp;
  }

  async GroupReconstructElements(source: XMLResult) {
    let xml = await source;
    const doc2 = fragment(await xml.results.text());
    let allnodes = fragment({ encoding: 'UTF-8' });
    doc2.map(
      (n) => {
        if (n.node.nodeName === 'item') {
          if (source.source === 'cbc') {
            n.removeAtt('https://www.cbc.ca/rss/cbc', 'type');
            n.removeAtt('https://www.cbc.ca/rss/cbc', 'deptid');
            n.removeAtt('https://www.cbc.ca/rss/cbc', 'syndicate');
            allnodes.import(n);
          } else {
            allnodes.import(n);
          }
        }
        // return n.toString();
      },
      true,
      true,
    );
    let root;
    root = create({})
      .ele(`parent`)
      .att('isparent', 'yes')
      .att('title', `${source.source}`)
      .import(allnodes);
    //root.import(allnodes);

    let temp: NewsSource = {
      source: xml.source,
      results: root.toString(),
    };
    return temp;
  }

  async Normalize(response: Array<Promise<XMLResult>> | Array<XMLResult>) {
    let res = this.ClassifySource(response);
    return (await res).news;
  }

  async GroupNormalize(response: Array<Promise<XMLResult>> | Array<XMLResult>) {
    let res = this.GroupClassifySource(response);
    return await res;
  }
}
