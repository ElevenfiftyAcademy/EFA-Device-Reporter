const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 685,
    webPreferences: {
      nodeIntegration: true,
    },
    title: "Eleven Fifty Academy Device Identifier"
  });
  win.loadFile("./src/views/index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  app.quit();
});
