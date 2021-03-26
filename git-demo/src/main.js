const electron = require('electron');
const {app, BrowserWindow} = electron;

let mainWindow

app.on('ready', _ => {
    console.log('Ready');

    mainWindow = new BrowserWindow( {
        width:400,
        height: 100
    });

    mainWindow.loadURL(`file:&//${__dirname}/status.html`);
});

app.on('close', _ => {
    mainWindow = null;
})