import {
  BrowserWindow,
  ipcMain,
  Notification,
  dialog,
  clipboard
} from 'electron';
import { IpcMainEvent } from 'electron/main';
import ReferenceAPI from './ReferenceAPI';

function errorDialogInterface(
  event: IpcMainEvent,
  errorData: {
    title: string;
    message: string;
  }
): void {
  dialog.showErrorBox(errorData.title, errorData.message);
}

function copyClipboard(event: IpcMainEvent, text: string): void {
  clipboard.writeText(text);
}

function setMainIpc(mainWindow: BrowserWindow): void {
  const insAPI = new ReferenceAPI();
  ipcMain.on('on-error', errorDialogInterface);
  ipcMain.on('error-dialog', errorDialogInterface);
  ipcMain.on('copy-clipboard', copyClipboard);
  ipcMain.on('notify', (_, message) => {
    new Notification({ title: 'Notification', body: message }).show();
  });
}

export default setMainIpc;
