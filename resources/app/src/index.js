const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
const appServer = require("./server");

let win;

function createWindow() {
  // Crea la ventana del navegador.
  win = new BrowserWindow({
    title: "Registro de estudiantes",
    width: 1242,
    height: 633,
    minWidth: 1300,
    minHeight: 633,
    center: true,
    resizable: true,
    backgroundColor: "#00bfa5"
  });

  // y carga el archivo index.html de la aplicación.
  win.loadURL("http://localhost:7011/login");

  // Abre las herramientas de desarrollo.
  // win.webContents.openDevTools();

  // Emitido cuando la ventana es cerrada.
  win.on("closed", () => {
    // Desreferencia el objeto ventana, usualmente tu guardarias ventanas
    // en un arreglo si tu aplicación soporta multi ventanas, este es el momento
    // cuando tu deberías borrar el elemento correspiente.
    win = null;
  });
}

// Este método será llamado cuando Electron haya terminado
// la inicialización y esté listo para crear ventanas del navegador.
// Algunas APIs pueden solamente ser usadas despues de que este evento ocurra.
app.on("ready", createWindow);

// Salir cuando todas las ventanas estén cerradas.
app.on("window-all-closed", () => {
  // En macOS es común para las aplicaciones y sus barras de menú
  // que estén activas hasta que el usuario salga explicitamente con Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

// Cerrar la app cuando todas las ventandas esten cerradas
app.on("window-all-closed", () => {
  app.quit();
});

// Desactivar el menubar
app.on("browser-window-created", function (err, window) {
  window.setMenu(null);
});

// Servidor
const port = process.env.PORT || 7011;
appServer.listen(port, () => {});
