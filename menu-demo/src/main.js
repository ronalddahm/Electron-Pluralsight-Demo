const electron = require('electron')
const app = electron.app
const browserWindow = electron.BrowserWindow
const menu = electron.Menu

app.on('ready', _ => {
    let mainWindow = new browserWindow();
    mainWindow.loadURL('https://github.com');

    // menu
    let name = electron.app.getName();
    const template = [
        {
            label: name,
            submenu : [{
                label: `About ${name}`, 
                click: _ => {
                    console.log('about clicked');
                },
                role : 'about'
            }, {
                type: 'separator'
            }, {
                label: `quit`,
                accelerator:'CmdOrCtrl+Q',
                click: _ => {
                    app.quit();
                }
            }]
        }
    ]
    const m = menu.buildFromTemplate(template);
    menu.setApplicationMenu(m);
})