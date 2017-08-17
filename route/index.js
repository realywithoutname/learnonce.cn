const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const qiniu = require('qiniu')
const Controllers = require('./../controller');
const Models = require('./../model');

const CorsCtrl = require('./../controller').Cors;
const auth = require('./../middleware/auth');
const router = new Router();

const rest = [{
  method: 'POST',
  name: 'create',
  url: '/api/${model}'
}, {
  method: 'GET',
  name: 'find',
  url: '/api/${model}'
}, {
  method: 'GET',
  name: 'findById',
  url: '/api/${model}/:id'
}, {
  method: 'PUT',
  name: 'updateById',
  url: '/api/${model}/:id'
}, {
  method: 'DELETE',
  name: 'deleteById',
  url: '/api/${model}/:id'
}]
for (let Model in Models) {
  if (Models.hasOwnProperty(Model)) {
    let model = Models[Model].modelName
    for (let r of rest) {
      router[r.method.toLowerCase()](`${r.url}`.replace(/\${\model\}/, model), function* (next) {
        let uperName = r.name.replace(/(\w)/, function (v) { return v.toUpperCase() });
        if (Controllers[Model][`before${uperName}`]) {
          yield Controllers[Model][`before${uperName}`](this, next);
        }
        yield Controllers[Model][r.name](this, next);
        if (Controllers[Model][`after${uperName}`]) {
          yield Controllers[Model][`after${uperName}`](this, next);
        }
      })
    }
  }
}
router.use(function* (next) {
  if (this.query.filter) {
    this.query.filter = JSON.parse(this.query.filter);
  }
  if (this.request.method === 'POST' || this.request.method === 'PUT') {
    yield auth(this);
  }
  if (this.status === 403) {
    this.body = '嘿嘿';
    return;
  }
  yield next;
});

router.get('/img', function* (next) {
  yield CorsCtrl.images(this);
});
router.post('/api/auth', function* (next) {
  this.body = true;
  yield next;
})
router.get('/api/qiniu/token', function* (next) {
  let mac = new qiniu.auth.digest.Mac('5_uCKx1KKgVWHSDwynLUnUA1JkHNNV2TBcb4FXAE', 'yT9g7f6-H6iwrmSQZVNeOA9jLIUEjphb5v7CejaZ')
  let token = new qiniu.rs.PutPolicy({ scope: 'learnonce' }).uploadToken(mac)
  this.body = {
    token, host: '//oh1syxf94.bkt.clouddn.com'
  }
})
module.exports = router;
