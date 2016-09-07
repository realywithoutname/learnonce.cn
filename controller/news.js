let NewsServive = new require('./../service').News;
let News = new NewsServive();

class NewsCtrl {
  * find (ctx) {
    ctx.body = yield News.find(ctx.query.filter || {});
  }
  * findById (ctx) {
    ctx.body = yield News.findById(ctx.params.id, {});
  }
}
module.exports = NewsCtrl;