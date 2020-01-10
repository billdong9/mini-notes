'use strict';

const fs = require('fs'),
    path = require('path');

const {
    app,
    dialog
} = require('electron');

module.exports = function(id) {
    const data = {
        ...global.notes[id]
    }

    delete data.id;

    fs.writeFile(path.join(app.getPath('appData'), 'mini-notes', 'notes', 'note' + global.notes[id].uuid + '.json'), JSON.stringify(data), (err) => {
        if (err) {
            dialog.showMessageBoxSync(global.win, {
                type: 'error',
                message: '笔记文件保存错误！',
                detail: '错误信息：' + err
            });
        }
    })
}
