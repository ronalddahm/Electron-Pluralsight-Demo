const electron = require('electron');
const {app} = electron;

app.on('ready', _ => {
    console.log('Ready');
});
