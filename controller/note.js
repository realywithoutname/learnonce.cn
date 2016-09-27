let NoteService = require('../service/note');
let Note = new NoteService();
let TagService = require('../service/tag');
let Tag = new TagService();

class NoteCtrl {
  * create (ctx) {
    let data = yield Note.create(ctx.request.body);
    data = data[0]
    if (data.tags) {
      let tags = data.tags.split(',')
      for (var i = 0; i < tags.length; i++) {
        let tag = yield Tag.findOne({where: {name: tags[i]}});
        if (!tag.length) {
          yield Tag.create({name: tags[i], count: 1, notes: [data._id]});
        } else {
          yield Tag.updateById(tag[0]._id, {$push: {notes: data._id}})
        }
      }
    }
    ctx.body = data
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
