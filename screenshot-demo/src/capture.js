const electron = require('electron');
const { fstat } = require('fs');
const { desktopCapturer, ipcRenderer: ipc, screen} = electron;
const path = require('path');
const fs = require('fs');
let count = 1;

function getMainSource(desktopCapturer, screen, done) {
    const options = { types: ['screen'], thumbnailSize: screen.getPrimaryDisplay().workAreaSize};
    desktopCapturer.getSources(options, (err, sources) => {
        if ( err) return console.log(err);
        const isMainSource = source => source.name === 'Entire screen' || source.name === 'Screen 1';
        done(sources.filter(isMainSource)[0]);
    });
}

function writeScreenshot(png, filepath) {
    fs.writeFile(filepath, png, err => {
        return console.log(err);
    })
}

function onCapture(evt, targetPath) {
    getMainSource(desktopCapturer,screen, source => {
        const png = source.thumbnail.toPng();
        const filepath = path.join(targetPath, (count++) +'.png');
        writeScreenshot(png, filepath);
    })
}

ipc.on('capture', onCapture)