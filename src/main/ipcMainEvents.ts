import {
  BrowserWindow,
  ipcMain,
  ipcRenderer,
  Notification,
  dialog
} from 'electron';
import { IpcMainEvent } from 'electron/main';
import References from './References';

function errorDialogInterface(
  event: IpcMainEvent,
  errorData: {
    title: string;
    message: string;
  }
): void {
  dialog.showErrorBox(errorData.title, errorData.message);
}

function setMainIpc(
  mainWindow: BrowserWindow,
  referencesObj: References
): void {
  ipcMain.on('get-reference', referencesObj.getReference);
  ipcMain.on('process-link', referencesObj.processLink);
  ipcMain.on('error-dialog', errorDialogInterface);
  ipcMain.on('notify', (_, message) => {
    new Notification({ title: 'Notification', body: message }).show();
  });
}

export default setMainIpc;
