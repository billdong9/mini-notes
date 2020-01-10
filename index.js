'use strict';

const {
    app,
    BrowserWindow
} = require('electron');

const init = require('./init'),
    viewStart = require('./view_start');

require('./ipcHandler');

global.notesAmount = 0;
global.notes = {};
global.currentNote = null;
global.win = null;
// DEBUG
global.debug = true;

function createWindow() {
    //init check
    init();

    global.win = new BrowserWindow({
        width: 1000,
        height: 750,
        minWidth: 600,
        minHeight: 400,
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true
        }
    });

    global.win.loadFile('./view/index.html');

    //DEBUG
    if (global.debug) {
        global.win.webContents.openDevTools();
    }

    global.win.on('closed', () => {
        global.win = null;
    });

    viewStart();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (global.win === null) {
        createWindow();
    }
});
