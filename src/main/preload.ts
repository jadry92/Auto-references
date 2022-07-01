import { contextBridge, ipcRenderer } from 'electron';
import { IpcRendererEvent } from 'electron/main';
import { ReferenceData } from './DataStorage';

interface callbackOn {
  (event: Event, args: any): void;
}

interface onChangeReferenceCallback {
  (
    event: IpcRendererEvent,
    action: string,
    id: string,
    result: ReferenceData | boolean
  ): void;
}

contextBridge.exposeInMainWorld('electron', {
  notificationAPI: {
    sendNotification(message: string) {
      ipcRenderer.send('notify', message);
    }
  },
  dialogAPI: {
    errorDialog(title: string, message: string) {
      const errorData = {
        title: title,
        message: message
      };
      ipcRenderer.send('error-dialog', errorData);
    }
  },
  dataAPI: {
    processURL(URL: string) {
      ipcRenderer.send('process-URL', URL);
    },
    getReference(id: string) {
      ipcRenderer.send('get-reference', id);
    },
    updateReference(data: ReferenceData) {
      ipcRenderer.send('update-reference', data);
    },
    partialUpdateReference(id: string, data: Partial<ReferenceData>) {
      ipcRenderer.send('partial-update-reference', id, data);
    },
    deleteReference(id: string) {
      ipcRenderer.send('delete-reference', id);
    },
    copyClipBoard(text: string) {
      ipcRenderer.send('copy-clipboard', text);
    }
  },
  onEventsAPI: {
    onProcessURLReady(callbackFun: callbackOn) {
      ipcRenderer.on('process-URL-ready', callbackFun);
    },
    onReferenceReady(callbackFun: callbackOn) {
      ipcRenderer.on('get-reference-ready', callbackFun);
    },
    onChangeReference(callbackFun: onChangeReferenceCallback) {
      ipcRenderer.on('on-change-reference', callbackFun);
    }
  }
});
