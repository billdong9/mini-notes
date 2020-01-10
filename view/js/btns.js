document.querySelector('#add-new-note-btn').onclick = function(){
    ipcRenderer.send('create-new-note');
}

document.querySelector('#remove-note-btn').onclick = function(){
    ipcRenderer.send('remove-note');
}
