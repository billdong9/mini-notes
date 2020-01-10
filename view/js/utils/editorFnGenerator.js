(function() {

    window.generateOnInputFn = function(id) {
        return function() {
            const data = editor.getContent();

            ipcRenderer.sendSync('set-global-sync', {
                layers: ['notes', id, 'content'],
                data
            })

            ipcRenderer.sendSync('set-global-sync', {
                layers: ['currentNote', 'content'],
                data
            })

            updateLastUpdateTime(id);

            ipcRenderer.send('save-note', id);
        }
    }

    window.generateTitleOnInputFn = function(id) {
        return function() {
            if (document.querySelector('#title-bar-input').value.trim() === '') {
                document.querySelector('.note-el-' + id).innerHTML = '&#xe60d;&nbsp;' + ipcRenderer.sendSync('get-global-sync', {
                    layers: ['notes', id, 'name']
                });
                return;
            }

            const data = document.querySelector('#title-bar-input').value;

            ipcRenderer.sendSync('set-global-sync', {
                layers: ['notes', id, 'name'],
                data
            })

            ipcRenderer.sendSync('set-global-sync', {
                layers: ['currentNote', 'name'],
                data
            })

            updateLastUpdateTime(id);

            document.querySelector('.note-el-' + id).innerHTML = '&#xe60d;&nbsp;' + data;

            ipcRenderer.send('save-note', id);
        }
    }

    function updateLastUpdateTime(id) {
        const time = new Date().getTime();

        let noteName = ipcRenderer.sendSync('get-global-sync', {
            layers: ['currentNote', 'name']
        });

        ipcRenderer.sendSync('set-global-sync', {
            layers: ['notes', id, 'lastUpdateTime'],
            data: time
        })

        ipcRenderer.sendSync('set-global-sync', {
            layers: ['currentNote', 'lastUpdateTime'],
            data: time
        })

        noteName = noteName ? noteName.replace(/"/g, '\\"') : '新笔记';

        renderNoteElTitle(document.querySelector('.note-el-' + id), noteName, time);
    }

}());
