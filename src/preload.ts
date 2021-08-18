import { contextBridge, ipcRenderer } from "electron";

interface callbackOn {
  (event: Event, args: any): void
}

contextBridge.exposeInMainWorld('electron', {
  notificationAPI: {
    sendNotification(message: string) {
      ipcRenderer.send("notify", message);
    },
  },
  dataAPI: {
    postLinks(listOfLinks: string[]) {
      ipcRenderer.send('submit-form', listOfLinks)
    },
    get: {},
    remove: {},
    update: {}
  },
  onEventsAPI: {
    onScrapingFinish(callbackFun: callbackOn) {
      ipcRenderer.on('data-ready', callbackFun)
    }
  },
});