(function() {

    const {
        Menu,
        MenuItem
    } = remote;

    const menu = new Menu();

    let eventTargetEl;

    menu.append(new MenuItem({
        label: '置顶 / 取消置顶',
        click: function() {
            const noteId = eventTargetEl.dataset.id,
                data = !ipcRenderer.sendSync('get-global-sync', {
                    layers: ['notes', noteId, 'isTop']
                });

            ipcRenderer.sendSync('set-global-sync', {
                layers: ['notes', noteId, 'isTop'],
                data
            });

            if (noteId == ipcRenderer.sendSync('get-global-sync', {
                    layers: ['currentNote', 'id']
                })) {
                ipcRenderer.sendSync('set-global-sync', {
                    layers: ['currentNote', 'isTop'],
                    data
                });
            }

            //if top this note
            if (data) {
                topLeftBarNotesList(noteId);
                switchNote(noteId);
            } else {
                normalLeftBarNotesList(noteId);
                switchNote(noteId);
            }

            ipcRenderer.send('save-note', noteId);
        }
    }));

    menu.append(new MenuItem({
        label: '复制',
        click: function() {

        }
    }));

    menu.append(new MenuItem({
        label: '删除',
        click: function() {
            ipcRenderer.send('remove-note', eventTargetEl.dataset.id);
        }
    }));

    window.renderLeftBarRightClickMenu = function() {
        const el = document.querySelectorAll('.note-el');
        for (let i = 0; i < el.length; i++) {
            el[i].oncontextmenu = function() {
                event.preventDefault();

                eventTargetEl = event.target;

                menu.popup({
                    window: remote.getCurrentWindow()
                })
            }
        }
    }

}());
