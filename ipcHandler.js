'use strict';

const {
    ipcMain
} = require('electron');

const saveNote = require('./utils/saveNote'),
    createNewNote = require('./utils/createNewNote'),
    removeNote = require('./utils/removeNote');

ipcMain.on('get-global-sync', function(e, args) {
    let data = global[args.layers[0]];

    for (let i = 1; i < args.layers.length; i++) {
        data = data[args.layers[i]];
    }

    e.returnValue = data;
});

ipcMain.on('set-global-sync', function(e, args) {
    if (args.layers.length <= 1) {
        global[args.layers[0]] = args.data;
        e.returnValue = true;
        return;
    }

    let data = global[args.layers[0]];

    for (let i = 1; i < args.layers.length - 1; i++) {
        data = data[args.layers[i]];
    }

    data[args.layers[args.layers.length - 1]] = args.data;

    e.returnValue = true;
});

ipcMain.on('remove-note', function(e, args) {
    removeNote(args);
});

ipcMain.on('create-new-note', function(e, args) {
    createNewNote();
});

ipcMain.on('save-note', function(e, args) {
    saveNote(args);
});

ipcMain.on('update-current-note', function(e, args) {
    global.currentNote = {
        ...global.notes[args]
    }
});
