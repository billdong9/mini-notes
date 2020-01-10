'use strict';

const fs = require('fs'),
    path = require('path');

const {
    app
} = require('electron');

const createNewNote = require('./createNewNote'),
    removeNoteOnView = require('./removeNoteOnView');

module.exports = function(id = global.currentNote.id) {
    removeNoteOnView(global.notes[id]);

    //remove note file
    if (fs.existsSync(path.join(app.getPath('appData'), 'mini-notes', 'notes', 'note' + global.notes[id].uuid + '.json'))) {
        fs.unlinkSync(path.join(app.getPath('appData'), 'mini-notes', 'notes', 'note' + global.notes[id].uuid + '.json'))
    }

    delete global.notes[id];

    if (Object.keys(global.notes).length === 0) {
        createNewNote();
        return;
    }

    if (id != global.currentNote.id) return;

    global.win.webContents.executeJavaScript(`
        switchNote(${global.notes[Object.keys(global.notes)[0]].id});
    `);
}
