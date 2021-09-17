import { HTMLElement, parse } from 'node-html-parser';
import DataStorage, { ReferenceData, refStatus } from './DataStorage';
import fetch from 'node-fetch';
import { dialog } from 'electron';

const titleRegex = /^.+\s[|\-.]\s([\w\s]{4,30})$/g;
const yearRegex = /\d\d\d\d/g;

async function scrapingLink(link: string): Promise<ReferenceData> {
  let data = {} as ReferenceData;
  const dataStorage = DataStorage.getInstance();

  dataStorage.create(link);
  data = dataStorage.getData(link);

  if (data.status === 'searching') {
    try {
      const response = await fetch(link);
      const text = await response.text();
      const dom = parse(text);
      if (link.match('^.+wikipedia.org.+$')) {
        data = getDataWiki(dom, data);
      } else if (link.match('.*.pdf$')) {
        data.title = 'Wrong link';
      } else if (link.match('^.+youtube.com.+$')) {
        data = getDataYouTube(dom, data);
      } else {
        data = getData(dom, data);
      }
      data.status = validInformation(data);
      const wasUpdated = dataStorage.setData(link, data);
      if (!wasUpdated) throw new Error('Data not updated');
    } catch (err: any) {
      if (err.name === 'FetchError') {
        data.status = 'wrong-link';
        const wasUpdated = dataStorage.setData(link, data);
        if (!wasUpdated) throw new Error('Data not updated');
      } else {
        throw err;
      }
    }
  }

  return data;
}

function validInformation(data: ReferenceData): refStatus {
  if (data.title === 'Wrong link') {
    return 'wrong-link';
  } else if (!data.yearPublish.match(yearRegex)) {
    return 'wrong-data';
  } else if (data.authorName === '' || data.authorSurname === '') {
    return 'wrong-data';
  } else if (data.title === '') {
    return 'wrong-data';
  } else {
    return 'ready';
  }
}

function getDataWiki(dom: HTMLElement, data: ReferenceData): ReferenceData {
  // title
  const h1Text = dom.querySelector('h1')
    ? dom.querySelector('h1').textContent
    : '';
  const titleText = dom.querySelector('title')
    ? dom.querySelector('title').textContent
    : '';
  data.title = titleText.match(h1Text) ? titleText.match(h1Text)[0] : titleText;

  // Author data
  data.authorName = 'wikipedia';
  data.authorSurname = 'wikipedia';
  // Dates
  const objDate = new Date();
  data.visitDate = objDate.getFullYear().toString();

  const lastModText = dom.querySelector('#footer-info-lastmod')
    ? dom.querySelector('#footer-info-lastmod').textContent
    : '';
  data.yearPublish = lastModText != '' ? lastModText.match(yearRegex)[0] : '';

  return data;
}

function getDataYouTube(dom: HTMLElement, data: ReferenceData): ReferenceData {
  const linkTags = dom.querySelectorAll('link')
    ? dom.querySelectorAll('link')
    : [];
  linkTags.forEach((tag) => {
    if (tag.getAttribute('itemprop') === 'name') {
      data.authorName = tag.getAttribute('content');
      data.authorSurname = tag.getAttribute('content');
    }
  });

  // Dates
  const objDate = new Date();
  data.visitDate = objDate.getFullYear().toString();
  const metaTags = dom.querySelectorAll('meta');
  metaTags.forEach((tag) => {
    if (tag.getAttribute('itemprop') === 'datePublished') {
      const textDate = yearRegex.exec(tag.getAttribute('content'));
      console.log(textDate);
      data.yearPublish = textDate ? textDate[0] : tag.getAttribute('content');
    } else if (tag.getAttribute('itemprop') === 'name') {
      data.title = tag.getAttribute('content');
    }
  });

  return data;
}

function getData(dom: HTMLElement, data: ReferenceData): ReferenceData {
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
  data.title = title
    .split('')
    .filter((character) => character != '\n')
    .join('')
    .trim();

  // Author data
  data.authorName = titleText.match(titleRegex)
    ? titleText.match(titleRegex)[0]
    : '';
  data.authorSurname = titleText.match(titleRegex)
    ? titleText.match(titleRegex)[0]
    : '';
  // Dates
  const objDate = new Date();
  data.visitDate = objDate.getFullYear().toString();
  data.yearPublish = '';

  return data;
}

export default scrapingLink;
