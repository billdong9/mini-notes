'use strict';

module.exports = function(note) {
    global.win.webContents.executeJavaScript(`
        (function() {
            document.querySelector('.note-el-${note.id}').remove();
        }());
    `);
}
