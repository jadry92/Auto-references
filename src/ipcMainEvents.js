import { ipcMain, dialog } from 'electron'


function setMainIpc(win) {
  ipcMain.on('open-directory', (event) => {
    dialog.showOpenDialog(win, {
      title: 'new location',
      buttonLabel: 'open location',
      properties: ['openDirectory']
    }, (dir) => {
      if (dir) {
        loadImages(event, dir[0])
      }
    })
  })

  ipcMain.on('load-directory', (event, dir) => {
    loadImages(event, dir)
  })


  ipcMain.on('show-dialog', (event, info) => {
    dialog.showMessageBox(win, {
      type: info.type,
      title: info.title,
      message: info.message
    })
  })
}


module.exports = setMainIpc