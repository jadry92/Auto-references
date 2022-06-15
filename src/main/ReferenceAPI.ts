/*
This Class implement the logic to handel the response of 
the events related with the Auto Reference logic

Author: Johan Suarez Largo
*/

import { IpcMainEvent, IpcMainInvokeEvent } from 'electron/main';
import DataStorage, { ReferenceData } from './DataStorage';
import ScrapingData from './ScrapingData';

class ReferenceAPI {
  private dataStorage: DataStorage;

  constructor() {
    this.dataStorage = DataStorage.getInstance();
  }

  public processURL = async (
    event: IpcMainInvokeEvent,
    URL: string
  ): Promise<string> => {
    const scrapingData = new ScrapingData(URL);
    const dataReference = await scrapingData.parsingReference();
    this.dataStorage.setData(dataReference);
    return dataReference.id;
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
}

export default ReferenceAPI;
