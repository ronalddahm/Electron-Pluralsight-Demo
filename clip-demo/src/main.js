const electron = require('electron');
const { statSync } = require('fs');
const path = require('path')
const {app, clipboard, globalShortcut ,Tray, Menu} = electron;
const MAX_SIZE = 5;
const MAX_ITEM_LENGTH = 20;

function checkClipboardForChange(clipboard, onChange) {
    let cache = clipboard.readText();
    let latest 
    setInterval(() => {
        latest = clipboard.readText();        
        if ( latest !== cache) {
            cache = latest;
            onChange(cache)
         }
    }, 1000);
}

function addToStack(text, stack) {
    return [text].concat(stack.length >= MAX_SIZE ? stack.slice(0, stack.length -1) : stack);
}

function formatItem( item ) {
    return item && item.length > MAX_ITEM_LENGTH ? item.substr(0,MAX_ITEM_LENGTH) + '....' : item;
}

function formatMenuTemplate(clipboard, stack) {
    return stack.map( (item, i) => {
        return {  
            label: `Copy: ${formatItem(item)}`, 
            click: _ => clipboard.writeText(item),
            acceletator: `Ctrl+Alt+${i+1}`
        }
    });
}

function registerShortcuts(globalShortcut, clipboard, stack)
{
    globalShortcut.unregisterAll();
    for(let i = 0; i<MAX_SIZE; ++i) {
        globalShortcut.register(`Ctrl+Alt+${i+1}`, _ => { clipboard.writeText(stack[i])})
    }
}

app.on('ready', _ => {
    let stack = [];
    let tray = new Tray(path.join('src', 'download.png'));
    tray.setContextMenu(Menu.buildFromTemplate([{label:'<Empty>', enabled: false}]))

    checkClipboardForChange(clipboard, text => {
        stack = addToStack(text, stack);
        tray.setContextMenu(Menu.buildFromTemplate(formatMenuTemplate(clipboard, stack)));
        console.log("Stack", stack);
        registerShortcuts(globalShortcut, clipboard, stack)
    });
})

app.on('will-quit', _ => {
    globalShortcut.unregisterAll();
})