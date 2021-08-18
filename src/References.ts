/*
This class implement all the logic of the auto reference tool
By: Johan Suarez Largo
*/

import { HTMLElement, parse } from 'node-html-parser';

import { IpcMainEvent } from 'electron/main';
import crypto from 'crypto'
import fetch from 'node-fetch'

interface ReferenceData {
  title: string,
  authorName: string,
  authorSurname: string,
  visitDate: string,
  yearPublish: string,
  URL: string,
  id: string
}


function emptyReferenceData(): ReferenceData {
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

class References {

  referenceList: [ReferenceData];
  private titleRegex: RegExp = /^.+\s[\|\-\.]\s([\w\s]{4,30})$/g;
  private yearRegex: RegExp = /^.*(\d\d\d\d).*$/g;

  constructor() {

  }

  scrapingData = (event: IpcMainEvent, listOfLinks: Set<string>) => {

    this.fetchData(event, listOfLinks).then(
      (dataRespond) => event.sender.send('data-ready', dataRespond)
    )

    //  .then((dataParsed) => console.log(dataParsed))//event.sender.send('data-ready', dataParsed))
    // .catch(() => console.log('error in the data parser process or save'))
  }

  private generateID(link: string): string {
    return crypto.createHash('md5').update(link).digest('hex')
  }


  private fetchData = async (event: IpcMainEvent, listOfLinks: Set<string>) => {
    let dataRespond = [] as ReferenceData[]
    console.log('links' + listOfLinks)
    const arrayListOfLinks = Array.from(listOfLinks)
    for (const link of arrayListOfLinks) {
      try {
        let referencesData = {} as ReferenceData
        const response = await fetch(link);
        const text = await response.text();
        const dom = parse(text);
        if (link.match('^.+wikipedia\.org.+$')) {
          referencesData = this.getDataWiki(dom)
        } else if (link.match('^.+youtube\.com.+$')) {
          referencesData = this.getDataYouTube(dom)
        } else {
          referencesData = this.getData(dom);
        }
        referencesData.URL = link
        referencesData.id = this.generateID(link)
        dataRespond.push(referencesData)
      } catch (error) {
        console.log(error);
      }
    }
    await this.save()
    return dataRespond
  };

  private save() {
    console.log('save data in db' + this.referenceList)
  }

  private getDataWiki(dom: HTMLElement): ReferenceData {
    let data: ReferenceData = emptyReferenceData()
    // title 
    const h1Text = dom.querySelector("h1").textContent;
    const titleText = dom.querySelector("title").textContent;
    data.title = (titleText.match(h1Text) ? titleText.match(h1Text)[0] : titleText);


    // Author data
    data.authorName = 'wikipedia'
    data.authorSurname = 'wikipedia'
    // Dates
    const objDate = new Date();
    data.visitDate = objDate.getFullYear().toString()

    const lastModText = dom.querySelector("#footer-info-lastmod").textContent;
    data.yearPublish = this.yearRegex.exec(lastModText)[1];

    return data;
  }


  private getDataYouTube(dom: HTMLElement): ReferenceData {
    let data: ReferenceData = emptyReferenceData()
    const linkTags = dom.querySelectorAll("link");
    linkTags.forEach(tag => {
      if (tag.getAttribute('itemprop') === 'name') {
        data.authorName = tag.getAttribute('content');
        data.authorSurname = tag.getAttribute('content');
      }
    })

    // Dates
    const objDate = new Date();
    data.visitDate = objDate.getFullYear().toString();
    const metaTags = dom.querySelectorAll("meta");
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

  private getData(dom: HTMLElement): ReferenceData {
    let data: ReferenceData = emptyReferenceData()
    // title 
    const h1Text: string = dom.querySelector("h1").textContent;
    const titleText: string = dom.querySelector("title").textContent;
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

export default References;


