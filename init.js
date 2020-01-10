'use strict';

const fs = require('fs'),
    path = require('path');

const {
    app
} = require('electron');

module.exports = function() {
    if (!fs.existsSync(path.join(app.getPath('appData'), 'mini-notes', 'notes'))) {
        fs.mkdirSync(path.join(app.getPath('appData'), 'mini-notes', 'notes'));
    }
}
