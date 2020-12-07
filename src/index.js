const { app, BrowserWindow } = require('electron');
const path = require('path');
const appServer = require("./server");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    title: "Registro de estudiantes",
    width: 1242,
    height: 633,
    minWidth: 1300,
    minHeight: 633,
    center: true,
    resizable: true,
    backgroundColor: "#00bfa5"
  });

  // and load the index.html of the app.
  mainWindow.loadURL("http://localhost:7011/login");


  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// Servidor
const port = process.env.PORT || 7011;
appServer.listen(port, () => {});