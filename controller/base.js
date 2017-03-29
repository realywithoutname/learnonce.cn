class BaseCtrl {
  constructor (Service) {
    this.service = new Service;
  }
  * create (ctx, next) {
    ctx.body = yield this.service.create(ctx.request.body || {})
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
  * deleteById (ctx, next) {
    ctx.body = yield this.service.distroyById(ctx.params.id);
  }
}
module.exports = BaseCtrl
