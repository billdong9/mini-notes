'use strict';

const Note = require('./../class/note'),
    addNoteOnView = require('./addNoteOnView'),
    guid = require('./guid');

module.exports = function() {
    const note = new Note(null, guid(), new Date().getTime(), '', false);

    addNoteOnView(note);

    global.notes[note.id.toString()] = note;

    global.win.webContents.executeJavaScript(`
        switchNote(${note.id});
    `);
}
