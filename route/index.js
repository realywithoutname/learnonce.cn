let Router = require('koa-router');
let NewsCtrl = require('./../controller').News;
let CorsCtrl = require('./../controller').Cors;
let NoteCtrl = require('./../controller').Note;
let FeedCtrl = require('./../controller').Feed;
let TagCtrl = require('./../controller').Tag;
let router = new Router();

router.use(function* (next) {
  if (this.query.filter) {
    this.query.filter = JSON.parse(this.query.filter)
  }
  yield next
});
router.get('/img', function* (next) {
  yield CorsCtrl.images(this);
});
router.get('/api/news', function* (next) {
  yield NewsCtrl.find(this);
});
router.get('/api/news/:id', function* (next) {
  yield NewsCtrl.findById(this);
});
router.get('/api/feeds', function* (next) {
  yield FeedCtrl.find(this);
});
router.post('/api/notes', function* (next) {
  yield NoteCtrl.create(this);
});
router.get('/api/notes', function* (next) {
  yield NoteCtrl.find(this);
});
router.put('/api/notes/:id', function* (next) {
  yield NoteCtrl.updateById(this);
});
router.get('/api/notes/:id', function* (next) {
  yield NoteCtrl.findById(this);
});
router.get('/api/tags', function* (next) {
  yield TagCtrl.find(this);
});
module.exports = router;
