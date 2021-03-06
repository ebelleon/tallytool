const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow () {
    win = new BrowserWindow({
        title: 'Abrechnungstool Handball',
        icon: path.join(__dirname + '/logo.png'),
        height: 800,
        width: 850,
        resizable: false,
        webPreferences: {
          nodeIntegration: true,
          sandbox: false
        }
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    win.on('closed', () => {
        win = null
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});
