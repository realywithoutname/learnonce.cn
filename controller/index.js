let NewsCtrl = require('./news');
let CorsCtrl = require('./cors');
let NoteCtrl = require('./note');
let FeedCtrl = require('./feed');
let TagCtrl = require('./tag');
module.exports = {
  News: new NewsCtrl(),
  Cors: new CorsCtrl(),
  Feed: new FeedCtrl(),
  Tag: new TagCtrl(),
  Note: new NoteCtrl()
}
