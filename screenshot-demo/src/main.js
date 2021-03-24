const electron = require('electron');
const {app, BrowserWindow, globalShortcut} = electron;

let mainWindow

app.on('ready', _ => {
    mainWindow = new BrowserWindow({
        width: 0,
        height: 0,
        resizeable: false,
        frame:  false,
        show: false
    });

    mainWindow.loadURL(`file://${__dirname}/capture.html`);

    mainWindow.openDevTools();

    mainWindow.on('close', _ => {
        mainWindow = null;
    } );

    globalShortcut.register('Ctrl+Alt+C', _ => {
        console.log('Got shortcut');
        mainWindow.webContents.send('capture', app.getPath('pictures'));
    })

});
