let NewsCtrl = require('./news');
let CorsCtrl = require('./cors');
let NoteCtrl = require('./note');
module.exports = {
  News: new NewsCtrl(),
  Cors: new CorsCtrl(),
  Note: new NoteCtrl()
}