import { contextBridge, ipcRenderer } from 'electron';
import { IpcRendererEvent } from 'electron/main';
import { ReferenceData } from './DataStorage';

interface callbackOn {
  (event: Event, args: any): void;
}

interface onChangeReferenceCallback {
  (
    event: IpcRendererEvent,
    link: string,
    action: string,
    status: boolean
  ): void;
}

interface onChangeUrlCallback {
  (
    event: IpcRendererEvent,
    oldLink: string,
    newLink: string,
    action: string,
    status: boolean
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
    getReference(link: string) {
      ipcRenderer.send('get-reference', link);
    },
    updateReference(link: string, data: ReferenceData) {
      ipcRenderer.send('update-reference', link, data);
    },
    deleteReference(link: string) {
      ipcRenderer.send('delete-reference', link);
    },
    requestEditReference(link: string) {
      ipcRenderer.send('request-edit-reference', link);
    },
    changeURLAndSearch(oldLink: string, newLink: string) {
      ipcRenderer.send('change-url-and-search', oldLink, newLink);
    },
    changeURLAndEdit(oldLink: string, newLink: string) {
      ipcRenderer.send('change-url-and-edit', oldLink, newLink);
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
    },
    onChangeUrl(callbackFun: onChangeUrlCallback) {
      ipcRenderer.on('on-url-change', callbackFun);
    }
  }
});
