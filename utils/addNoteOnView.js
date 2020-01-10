'use strict';

module.exports = function(note) {
    const noteName = note.name ? note.name.replace(/"/g, '\\"') : '新笔记';

    global.win.webContents.executeJavaScript(`
        (function() {
            const notesEl = document.createElement('div');
            notesEl.classList.add('iconfont', 'note-el', 'note-el-${note.id}');
            notesEl.setAttribute('data-id', ${note.id});
            renderNoteElTitle(notesEl, "${noteName}", ${note.lastUpdateTime})
            notesEl.innerHTML = "&#xe60d;&nbsp;${noteName}";
            notesEl.onclick = function() {
                switchNote(this.dataset.id);
            }

            ${note.isTop ? "notesEl.innerHTML = '<div class=\"note-el-top-badge\"></div>' + notesEl.innerHTML;" : ""}

            ${note.isTop ? "document.querySelector('#left-bar-inner-top').appendChild(notesEl);" : "document.querySelector('#left-bar-inner-normal').appendChild(notesEl);"}

            renderLeftBarRightClickMenu();
        }());
    `);
}
