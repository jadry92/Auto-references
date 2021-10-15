import {
  BrowserWindow,
  ipcMain,
  Notification,
  dialog,
  clipboard
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

function copyClipboard(event: IpcMainEvent, text: string): void {
  clipboard.writeText(text);
}

function setMainIpc(
  mainWindow: BrowserWindow,
  referencesObj: References
): void {
  ipcMain.on('get-reference', referencesObj.getReference);
  ipcMain.on('update-reference', referencesObj.updateReference);
  ipcMain.on('delete-reference', referencesObj.deleteReference);
  ipcMain.on('process-link', referencesObj.processLink);
  ipcMain.on('error-dialog', errorDialogInterface);
  ipcMain.on('request-edit-reference', referencesObj.requestEditReference);
  ipcMain.on('change-url-and-search', referencesObj.changeUrlAndSearch);
  ipcMain.on('change-url-and-edit', referencesObj.changeUrlAndEdit);
  ipcMain.on('copy-clipboard', copyClipboard);
  ipcMain.on('notify', (_, message) => {
    new Notification({ title: 'Notification', body: message }).show();
  });
}

export default setMainIpc;
