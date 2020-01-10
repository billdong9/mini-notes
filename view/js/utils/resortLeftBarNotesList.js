function topLeftBarNotesList(id) {
    const noteNode = document.querySelector('#left-bar-inner-normal .note-el-' + id).cloneNode(true);
    noteNode.innerHTML = '<div class="note-el-top-badge"></div>' + noteNode.innerHTML;

    document.querySelector('#left-bar-inner-normal .note-el-' + id).remove();

    document.querySelector('#left-bar-inner-top').appendChild(noteNode);

    renderLeftBar(noteNode);
}

function normalLeftBarNotesList(id) {
    const noteNode = document.querySelector('#left-bar-inner-top .note-el-' + id).cloneNode(true);

    document.querySelector('#left-bar-inner-top .note-el-' + id).remove();

    document.querySelector('#left-bar-inner-normal').appendChild(noteNode);

    document.querySelector('#left-bar-inner-normal .note-el-' + id + ' .note-el-top-badge').remove();

    renderLeftBar(noteNode);
}

function renderLeftBar(noteNode) {
    noteNode.onclick = function() {
        switchNote(this.dataset.id);
    }
    renderLeftBarRightClickMenu();
}
