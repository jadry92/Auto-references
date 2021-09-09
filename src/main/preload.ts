import { contextBridge, ipcRenderer } from 'electron';

interface callbackOn {
  (event: Event, args: any): void;
}

contextBridge.exposeInMainWorld('electron', {
  notificationAPI: {
    sendNotification(message: string) {
      ipcRenderer.send('notify', message);
    }
  },
  dataAPI: {
    processLink(link: string) {
      ipcRenderer.send('process-link', link);
    },
    getReference(link: string) {
      ipcRenderer.send('get-reference', link);
    },
    remove: {},
    update: {}
  },
  onEventsAPI: {
    onProcessLinkReady(callbackFun: callbackOn) {
      ipcRenderer.on('process-link-ready', callbackFun);
    },
    onReferenceReady(callbackFun: callbackOn) {
      ipcRenderer.on('get-reference-ready', callbackFun);
    }
  }
});
