let NoteService = require('../service/note');
let Note = new NoteService();

class NoteCtrl {
  * create (ctx) {
    ctx.body = yield Note.create(ctx.request.body);
  }
  * find (ctx) {
    ctx.body = yield Note.find(ctx.query.filter || {})
  }
  * findById (ctx) {
    ctx.body = yield Note.findById(ctx.params.id, ctx.query.filter || {})
  }
  * updateById (ctx) {
    ctx.body = yield Note.updateById(ctx.params.id, ctx.request.body)
  }
}
module.exports = NoteCtrl;
