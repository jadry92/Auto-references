/*
This Class implement the logic to handel the response of 
the events related with the Auto Reference logic

Author: Johan Suarez Largo
*/

import { IpcMainEvent } from 'electron/main';
import DataStorage, { ReferenceData } from './DataStorage';
import scrapingLink, { validInformation } from './Scraping';

class References {
  private links: string[];
  private DataStorage: DataStorage;

  constructor() {
    this.DataStorage = DataStorage.getInstance();
  }

  public updateReference = (
    event: IpcMainEvent,
    link: string,
    data: ReferenceData
  ): void => {
    data.status = validInformation(data);
    const result = this.DataStorage.setData(link, data);
    event.sender.send('on-change-reference', link, 'update', result);
  };

  public deleteReference = (event: IpcMainEvent, link: string): void => {
    const result = this.DataStorage.remove(link);
    event.sender.send('on-change-reference', link, 'delete', result);
  };

  public changeUrlAndSearch = (
    event: IpcMainEvent,
    oldLink: string,
    newLink: string
  ): void => {
    const result = this.DataStorage.changeUrlAndSearch(oldLink, newLink);
    event.sender.send(
      'on-url-change',
      oldLink,
      newLink,
      'change-url-search',
      result
    );
  };

  public changeUrlAndEdit = (
    event: IpcMainEvent,
    oldLink: string,
    newLink: string
  ): void => {
    const result = this.DataStorage.changeUrlAndEdit(oldLink, newLink);
    event.sender.send(
      'on-url-change',
      oldLink,
      newLink,
      'change-url-edit',
      result
    );
  };

  public requestEditReference = (event: IpcMainEvent, link: string): void => {
    const result = this.DataStorage.enableEditing(link);
    event.sender.send('on-change-reference', link, 'editing', result);
  };

  public processLink = (event: IpcMainEvent, link: string): void => {
    scrapingLink(link)
      .then((dataRef) => event.sender.send('process-link-ready', dataRef.URL))
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
