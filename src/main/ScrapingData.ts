import { HTMLElement, parse } from 'node-html-parser';
import { ReferenceData, refStatus } from './DataStorage';
import fetch from 'node-fetch';
import { testInternetConnection, validInformation } from './utils';
import { dialog } from 'electron';

const titleRegex = /^.+\s[|\-.]\s([\w\s]{4,30})$/g;
const yearRegex = /\d\d\d\d/g;

class ScrapingData {
  private data: ReferenceData;

  constructor(URL: string) {
    this.data = {
      id: '',
      title: '',
      authorName: '',
      authorSurname: '',
      visitDate: '',
      yearPublish: '',
      URL: URL,
      status: <refStatus>'searching'
    };
  }

  private getDataYouTube = (dom: HTMLElement): void => {
    const linkTags = dom.querySelectorAll('link')
      ? dom.querySelectorAll('link')
      : [];
    linkTags.forEach((tag) => {
      if (tag.getAttribute('itemprop') === 'name') {
        this.data.authorName = tag.getAttribute('content');
        this.data.authorSurname = tag.getAttribute('content');
      }
    });

    // Dates
    const objDate = new Date();
    this.data.visitDate = objDate.getFullYear().toString();
    const metaTags = dom.querySelectorAll('meta');
    metaTags.forEach((tag) => {
      if (tag.getAttribute('itemprop') === 'datePublished') {
        const textDate = yearRegex.exec(tag.getAttribute('content'));
        this.data.yearPublish = textDate
          ? textDate[0]
          : tag.getAttribute('content');
      } else if (tag.getAttribute('itemprop') === 'name') {
        this.data.title = tag.getAttribute('content');
      }
    });

    this.data.status = validInformation(this.data);
  };

  private getData = (dom: HTMLElement): void => {
    // title
    const h1Text: string = dom.querySelector('h1')
      ? dom.querySelector('h1').textContent
      : '';
    const titleText: string = dom.querySelector('title')
      ? dom.querySelector('title').textContent
      : '';
    const title = titleText.match(h1Text)
      ? titleText.match(h1Text)[0]
      : titleText;
    this.data.title = title
      .split('')
      .filter((character) => character != '\n')
      .join('')
      .trim();

    // Author this.data
    this.data.authorName = titleText.match(titleRegex)
      ? titleText.match(titleRegex)[0]
      : '';
    this.data.authorSurname = titleText.match(titleRegex)
      ? titleText.match(titleRegex)[0]
      : '';
    // Dates
    const objDate = new Date();
    this.data.visitDate = objDate.getFullYear().toString();
    this.data.yearPublish = '';

    this.data.status = validInformation(this.data);
  };

  private getDataWiki = (dom: HTMLElement): void => {
    // title
    const h1Text = dom.querySelector('h1')
      ? dom.querySelector('h1').textContent
      : '';
    const titleText = dom.querySelector('title')
      ? dom.querySelector('title').textContent
      : '';
    this.data.title = titleText.match(h1Text)
      ? titleText.match(h1Text)[0]
      : titleText;

    // Author data
    this.data.authorName = 'wikipedia';
    this.data.authorSurname = 'wikipedia';
    // Dates
    const objDate = new Date();
    this.data.visitDate = objDate.getFullYear().toString();

    const lastModText = dom.querySelector('#footer-info-lastmod')
      ? dom.querySelector('#footer-info-lastmod').textContent
      : '';
    this.data.yearPublish =
      lastModText != '' ? lastModText.match(yearRegex)[0] : '';

    this.data.status = validInformation(this.data);
  };

  public parsingReference = async (): Promise<ReferenceData> => {
    const URL = this.data.URL;
    const dom = await this.scraping();
    if (dom) {
      if (URL.match('^.+wikipedia.org.+$')) {
        this.getDataWiki(dom);
      } else if (URL.match('.*.pdf$')) {
        this.data.status = 'wrong-link';
      } else if (URL.match('^.+youtube.com.+$')) {
        this.getDataYouTube(dom);
      } else {
        this.getData(dom);
      }
    }
    return this.data;
  };

  private scraping = async (): Promise<HTMLElement> => {
    const isThereConnection = await testInternetConnection();
    let dom: HTMLElement;
    if (isThereConnection) {
      try {
        const response = await fetch(this.data.URL);
        const rawHTML = await response.text();
        dom = parse(rawHTML);
      } catch (err: any) {
        if (err.name === 'FetchError') {
          this.data.status = 'wrong-link';
        } else {
          throw err;
        }
      }
    }
    return dom;
  };
}
export default ScrapingData;
