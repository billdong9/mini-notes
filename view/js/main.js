const {
    remote,
    ipcRenderer
} = require('electron');

window.editor = new MediumEditor('#editor', {
    toolbar: {
        buttons: ['h1', 'h2', 'h3', 'bold', 'italic', 'underline', 'strikethrough', 'quote', 'anchor', 'justifyLeft', 'justifyCenter', 'justifyRight', 'superscript', 'subscript', 'orderedlist', 'unorderedlist', 'pre', 'removeFormat']
    },
    anchor: {
        targetCheckbox: true
    }
})
