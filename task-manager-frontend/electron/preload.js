// electron/preload.js
const { contextBridge, ipcRenderer } = require('electron');

// Експортуємо API для рендерера
contextBridge.exposeInMainWorld('electron', {
  getTasks: () => ipcRenderer.invoke('get-tasks'), 
  createTask: (taskData) => ipcRenderer.invoke('create-task', taskData),
});
