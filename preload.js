const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  pickPdf: () => ipcRenderer.invoke('pick-pdf'),
  convert: (path) => ipcRenderer.invoke('convert', path)
});