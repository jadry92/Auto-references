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
    processLink(link: string) {
      ipcRenderer.send('process-link', link);
    },
    getReference(link: string) {
      ipcRenderer.send('get-reference', link);
    },
    remove: {}
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
