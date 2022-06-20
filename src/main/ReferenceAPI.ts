/*
This Class implement the logic to handel the response of 
the events related with the Auto Reference logic

Author: Johan Suarez Largo
*/

import { IpcMainEvent, IpcMainInvokeEvent } from 'electron/main';
import DataStorage, { ReferenceData } from './DataStorage';
import ScrapingData from './ScrapingData';

class ReferenceAPI {
  private static API: ReferenceAPI;
  private dataStorage: DataStorage;

  private constructor() {
    this.dataStorage = DataStorage.getInstance();
  }

  public static getInstance(): ReferenceAPI {
    if (!ReferenceAPI.API) {
      ReferenceAPI.API = new ReferenceAPI();
    }
    return ReferenceAPI.API;
  }

  public processURL = (event: IpcMainEvent, URL: string): void => {
    const scrapingData = new ScrapingData(URL);
    scrapingData
      .parsingReference()
      .then((dataReference) => {
        this.dataStorage.setData(dataReference);
        event.sender.send('process-URL-ready');
      })
      .catch((error) => {
        event.sender.send('on-error', error);
      });
  };

  public getReference = (event: IpcMainEvent, id: string): void => {
    const query = this.dataStorage.getData(id);
    event.sender.send('get-reference-ready', query);
  };

  public updateReference = (event: IpcMainEvent, data: ReferenceData): void => {
    const result = this.dataStorage.putDataID(data);
    event.sender.send('on-change-reference', 'update', result);
  };

  public deleteReference = (event: IpcMainEvent, id: string): void => {
    const result = this.dataStorage.deleteData(id);
    event.sender.send('on-change-reference', 'delete', result);
  };

  public partialUpdate = (
    event: IpcMainEvent,
    id: string,
    data: Partial<ReferenceData>
  ): void => {
    const result = this.dataStorage.patchDataID(id, data);
    event.sender.send('on-change-reference', 'partialUpdate', result);
  };

  public saveReference = (): void => {
    this.dataStorage.save();
  };
}

export default ReferenceAPI;
