let BaseCtrl = require('./base');
let NoteService = require('../service/note');
let Note = new NoteService();
let TagService = require('../service/tag');
let Tag = new TagService();

class NoteCtrl extends BaseCtrl {
  constructor () {
    super(NoteService);
  }
  * afterDeleteById (ctx, next) {
    let tags = ctx.body.tags
    if (tags) {
      tags = tags.split(',')
      for (var i = 0; i < tags.length; i++) {
        let tag = yield Tag.findOne({where: {name: tags[i]}});
        if (tag.length) {
          let notes = tag[0].notes.filter((item) => {
            return item.toString() !== ctx.body._id.toString();
          });
          yield Tag.updateById(tag[0]._id, {count: notes.length, $set: {notes}})
        }
      }
    }
  }
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
          yield Tag.updateById(tag[0]._id, {$push: {notes: data._id}, count: tag[0].count + 1})
        }
      }
    }
    ctx.body = data
  }
}
module.exports = NoteCtrl;
