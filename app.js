let koa = require('koa');
let path = require('path');
let send = require('koa-send');
let bodyParser = require('koa-body');
let static = require('koa-static-server');
let xmlParser = require('koa-xml-body').default;

let router = require('./route');
let boot = require('./boot');
let app = koa();

require('./task/reader');

app.use(xmlParser());
app.use(bodyParser());
app.use(static({ rootDir: 'react-re/dist' }));
app.use(router.routes());
app.use(function* (err) {
  if (this.response.status === 404) {
    yield send(this, path.resolve(__dirname, '/react-re/dist/index.html'))
  }
})
app.on('error', function (err, ctx) {
  if (process.env.NODE_ENV === 'production') {
    console.log("server err: %s", err);
  } else {
    console.log(err);
  }
});
app.listen(3000)
console.info('server listen on %s', 3000)
