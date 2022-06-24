/*
This Class implement the logic to handel the response of 
the events related with the Auto Reference logic

Author: Johan Suarez Largo
*/

import { IpcMainEvent, IpcMainInvokeEvent } from 'electron/main';
import DataStorage, { ReferenceData } from './DataStorage';
import ScrapingData from './ScrapingData';
import { ipcMain } from 'electron';

class ReferenceAPI {
  private static API: ReferenceAPI;
  private dataStorage: DataStorage;

  constructor() {
    this.dataStorage = DataStorage.getInstance();
    ipcMain.on('get-reference', this.getReference);
    ipcMain.on('update-reference', this.updateReference);
    ipcMain.on('delete-reference', this.deleteReference);
    ipcMain.on('process-URL', this.processURL);
  }

  private processURL = (event: IpcMainEvent, URL: string): void => {
    const scrapingData = new ScrapingData(URL);

    scrapingData
      .parsingReference()
      .then((dataReference) => {
        const dbReference = this.dataStorage.setData(dataReference);
        event.sender.send('process-URL-ready', dbReference);
      })
      .catch((error) => {
        console.log(error);
        event.sender.send('on-error', error);
      });
    event.sender.send('get-reference-ready', 'dsadasd');
  };

  private getReference = (event: IpcMainEvent, id: string): void => {
    const query = this.dataStorage.getData(id);
    event.sender.send('get-reference-ready', query);
  };

  private updateReference = (
    event: IpcMainEvent,
    data: ReferenceData
  ): void => {
    const result = this.dataStorage.putDataID(data);
    event.sender.send('on-change-reference', 'update', result);
  };

  private deleteReference = (event: IpcMainEvent, id: string): void => {
    const result = this.dataStorage.deleteData(id);
    event.sender.send('on-change-reference', 'delete', result);
  };

  private partialUpdate = (
    event: IpcMainEvent,
    id: string,
    data: Partial<ReferenceData>
  ): void => {
    const result = this.dataStorage.patchDataID(id, data);
    event.sender.send('on-change-reference', 'partialUpdate', result);
  };

  private saveReference = (): void => {
    this.dataStorage.save();
  };
}

export default ReferenceAPI;
