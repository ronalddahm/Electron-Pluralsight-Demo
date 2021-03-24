const electron = require('electron')
const path = require('path')
const { app, Tray, Menu } = electron;

app.on('ready', _ => {
    const tray = new Tray(path.join('src', 'download.png'));
    let template = [
        { 
            label: 'Wow',
            click: _ => { console.log("Wow")}
        }
    ]
    const menu = Menu.buildFromTemplate(template);
    tray.setContextMenu(menu);
    tray.setToolTip('Tray-Demo');
})


