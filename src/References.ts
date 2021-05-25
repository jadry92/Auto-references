/*
This class implement all the logic of the auto reference tool
By: Johan Suarez
*/

// imports
import fetch from 'node-fetch'
import { JSDOM } from 'jsdom'
import { IpcMainEvent } from 'electron/main';

export interface ReferenceData {
  title: string,
  authorName: string,
  authorSurname: string,
  visitDate: string,
  yearPublish: string,
  URL: string,
  id: string
}
export function emptyReferenceData(): ReferenceData {
  return {
    title: '',
    authorName: '',
    authorSurname: '',
    visitDate: '',
    yearPublish: '',
    URL: '',
    id: ''
  }
}
export default class References {

  referenceList: [ReferenceData];
  private titleRegex: RegExp = /^.+\s[\|\-\.]\s([\w\s]{4,30})$/g;
  private yearRegex: RegExp = /^.*(\d\d\d\d).*$/g;

  constructor() {

  }

  scrapingData(event: IpcMainEvent, dataList: { id: string, validation: boolean, URL: string }[]) {
    this.fetchData(event, dataList)
      .then((dataParsed) => event.sender.send('data-ready', dataParsed))
      .catch(() => console.log('error in the data parser process or save'))
  }

  private async fetchData(event: IpcMainEvent, dataList: { id: string, validation: boolean, URL: string }[]): Promise<[ReferenceData]> {
    let dataRef = emptyReferenceData()

    for (const data of dataList) {
      try {
        if (data.validation) {

          const response = await fetch(data.URL);
          const text = await response.text();
          const dom = new JSDOM(text);
          if (data.URL.match('^.+wikipedia\.org.+$')) {
            dataRef = this.getDataWiki(dom)
          } else if (data.URL.match('^.+youtube\.com.+$')) {
            dataRef = this.getDataYouTube(dom)
          } else {
            dataRef = this.getData(dom);
          }
        }
        dataRef.URL = data.URL
        dataRef.id = data.id
        this.referenceList.push(dataRef)
      } catch (error) {
        console.log(error);
      }
      dataRef = emptyReferenceData()
    }
    await this.save()
    return this.referenceList
  }

  private save() {
    console.log('save data in db' + this.referenceList)
  }

  private getDataWiki(dom: JSDOM): ReferenceData {
    let data: ReferenceData = emptyReferenceData()
    // title 
    const h1Text = dom.window.document.querySelector("h1").textContent;
    const titleText = dom.window.document.querySelector("title").textContent;
    data.title = (titleText.match(h1Text) ? titleText.match(h1Text)[0] : titleText);


    // Author data
    data.authorName = 'wikipedia'
    data.authorSurname = 'wikipedia'
    // Dates
    const objDate = new Date();
    data.visitDate = objDate.getFullYear().toString()

    const lastModText = dom.window.document.querySelector("#footer-info-lastmod").textContent;
    data.yearPublish = this.yearRegex.exec(lastModText)[1];

    return data;
  }


  private getDataYouTube(dom: JSDOM): ReferenceData {
    let data: ReferenceData = emptyReferenceData()
    const linkTags: NodeListOf<HTMLElement> = dom.window.document.querySelectorAll("link");
    linkTags.forEach(tag => {
      if (tag.getAttribute('itemprop') === 'name') {
        data.authorName = tag.getAttribute('content');
        data.authorSurname = tag.getAttribute('content');
      }
    })

    // Dates
    const objDate = new Date();
    data.visitDate = objDate.getFullYear().toString();
    const metaTags: NodeListOf<HTMLElement> = dom.window.document.querySelectorAll("meta");
    metaTags.forEach(tag => {
      if (tag.getAttribute('itemprop') === 'datePublished') {
        const textDate = this.yearRegex.exec(tag.getAttribute('content'))
        data.yearPublish = (textDate ? textDate[1] : tag.getAttribute('content'));
      } else if (tag.getAttribute('itemprop') === 'name') {
        data.title = tag.getAttribute('content');
      }
    })

    return data;
  }

  private getData(dom: JSDOM): ReferenceData {
    let data: ReferenceData = emptyReferenceData()
    // title 
    const h1Text: string = dom.window.document.querySelector("h1").textContent;
    const titleText: string = dom.window.document.querySelector("title").textContent;
    data.title = (titleText.match(h1Text) ? titleText.match(h1Text)[0] : titleText);
    // Author data
    const title = this.titleRegex.exec(titleText)
    data.authorName = (title ? title[1] : titleText)
    data.authorSurname = (title ? title[1] : titleText)
    // Dates
    const objDate = new Date();
    data.visitDate = objDate.getFullYear().toString()
    data.yearPublish = '';

    return data;
  }
}

