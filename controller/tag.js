let TagService = require('../service/tag');
let Tag = new TagService();

class TagCtrl {
  * find (ctx) {
    ctx.body = yield Tag.find(ctx.query.filter || {limit: 1000})
  }
}
module.exports = TagCtrl;
