let koa = require('koa');
let path = require('path');
let bodyParser = require('koa-body');
let static = require('koa-static-server');
let xmlParser = require('koa-xml-body').default;

let router = require('./route');
let boot = require('./boot'); // 都没有使用,结果执行了。。。
let task = require('./task');
let app = koa();

app.use(xmlParser());
app.use(bodyParser());
app.use(static({rootDir: 'dist'}));
app.use(router.routes());
app.on('error', function (err, ctx) {
  console.log("server err: %s", err)
});
app.listen(3000)
console.info('server listen on %s', 3000)
task();
