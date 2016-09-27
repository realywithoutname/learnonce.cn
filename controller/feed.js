let FeedServive = new require('./../service').Feed;
let Feed = new FeedServive();

class FeedCtrl {
  * find (ctx) {
    ctx.body = yield Feed.find(ctx.query.filter || {});
  }
  * findById (ctx) {
    ctx.body = yield Feed.findById(ctx.params.id, {});
  }
}
module.exports = FeedCtrl;
