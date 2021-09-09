import { BrowserWindow, ipcMain } from 'electron';
import References from './References';

function setMainIpc(
  mainWindow: BrowserWindow,
  referencesObj: References
): void {
  ipcMain.on('get-reference', referencesObj.getReference);
  ipcMain.on('process-link', referencesObj.processLink);
}

export default setMainIpc;
