'use strict';

const fs = require('fs'),
    path = require('path');

const {
    app
} = require('electron');

const createNewNote = require('./createNewNote'),
    addNoteOnView = require('./addNoteOnView'),
    Note = require('./../class/note');

module.exports = function() {
    const orNotes = fs.readdirSync(path.join(app.getPath('appData'), 'mini-notes', 'notes')),
        notes = [];

    for (let i = 0; i < orNotes.length; i++) {
        if (orNotes[i] === '.DS_Store') {
            continue;
        }
        notes.push(orNotes[i]);
    }

    if (notes.length === 0) {
        createNewNote();
        return;
    }

    let noteInfo,
        noteObj;
    for (let i = 0; i < notes.length; i++) {
        noteInfo = JSON.parse(fs.readFileSync(path.join(app.getPath('appData'), 'mini-notes', 'notes', notes[i])).toString());
        noteObj = new Note(noteInfo.name, noteInfo.uuid, noteInfo.lastUpdateTime, noteInfo.content, noteInfo.isTop);

        addNoteOnView(noteObj);

        global.notes[noteObj.id] = noteObj;
    }

    global.win.webContents.executeJavaScript(`
        switchNote(${global.notes[1].id});
    `);
}
