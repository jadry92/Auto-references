/*
This Class implement the logic to handel the response of 
the events related with the Auto Reference logic

Author: Johan Suarez Largo
*/

import { IpcMainEvent } from 'electron/main';
import DataStorage from './DataStorage';
import scrapingLink from './Scraping';

class References {
  private links: string[];
  private DataStorage: DataStorage;

  constructor() {
    this.DataStorage = DataStorage.getInstance();
  }

  public processLink = (event: IpcMainEvent, link: string): void => {
    scrapingLink(link)
      .then((linkCreated) =>
        event.sender.send('process-link-ready', linkCreated.URL)
      )
      .catch((err) => console.log(err.name + err.message));
  };

  public getReference = (event: IpcMainEvent, link: string): void => {
    const query = this.DataStorage.getData(link);
    event.sender.send('get-reference-ready', query);
  };

  public saveReference = (): void => {
    this.DataStorage.save();
  };
}

export default References;
