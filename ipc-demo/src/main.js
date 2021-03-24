const electron = require('electron')
const app = electron.app;
const browerWindow = electron.BrowserWindow
const ipc = electron.ipcMain
const countdown = require('./countdown')

let windows = []

app.on('ready', _ => { 
    [1,2,3].forEach( _ => {
        let win = new browerWindow({ 
            height:400, 
            width:400, 
            webPreferences: { nodeIntegration: true }
        });
    
        win.loadURL('file://' + __dirname + '/countdown.html');
    
        win.on('closed', _ => {
            console.log('Closed');
            // mainWindow = null;
        })

        windows.push(win);
    })
})

ipc.on('countdown-start', _ => {
    console.log("countdown-start");
    countdown( count => {
        windows.forEach( win => {
            win.webContents.send('countdown', count);
        })
    });
})

