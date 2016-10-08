class BaseCtrl {
  constructor (Service) {
    this.service = new Service;
  }
  * find (ctx, next) {
    ctx.body = yield this.service.find(ctx.query.filter || {});
  }
  * findById (ctx, next) {
    ctx.body = yield this.service.findById(ctx.params.id, {});
  }
  * updateById (ctx, next) {
    ctx.body = yield this.service.updateById(ctx.params.id, ctx.request.body);
  }
}
module.exports = BaseCtrl
