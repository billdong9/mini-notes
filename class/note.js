'use strict';

class Note {
    constructor(name, uuid, lastUpdateTime, content, isTop) {
        this.id = ++global.notesAmount;
        this.uuid = uuid;
        this.name = name;
        this.lastUpdateTime = lastUpdateTime;
        this.content = content;
        this.isTop = isTop;
    }
}

module.exports = Note;
