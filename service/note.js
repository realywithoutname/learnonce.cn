let Base = require('./base');
let NoteModel = require('./../model').Note;

class Note extends Base{
  constructor () {
    super(NoteModel);
  }
}
module.exports = Note;