(function() {

    window.switchNote = function(id) {
        const currentNoteObj = ipcRenderer.sendSync('get-global-sync', {
            layers: ['currentNote']
        });

        if (currentNoteObj !== null && id == currentNoteObj.id) return;

        const notes = ipcRenderer.sendSync('get-global-sync', {
            layers: ['notes', id]
        });;

        if (!notes) return;

        //clear last input listener
        document.querySelector('#editor').oninput = document.querySelector('#title-bar-input').oninput = () => {};

        document.querySelector('#title-bar-input').value = notes.name;
        editor.setContent(notes.content.trim() === '' ? '<p><br></p>' : notes.content);

        //set new input listener
        document.querySelector('#editor').oninput = generateOnInputFn(id);
        document.querySelector('#title-bar-input').oninput = generateTitleOnInputFn(id);

        removeCurNoteClass();
        document.querySelector('.note-el-' + id).classList.add('cur-note');

        ipcRenderer.send('update-current-note', id);
    }

    function removeCurNoteClass() {
        if (!document.querySelector('.cur-note')) return;
        document.querySelector('.cur-note').classList.remove('cur-note');
    }

}());
