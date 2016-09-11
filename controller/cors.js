let request = require('superagent');
class CorsCtrl {
  * images (ctx) {
    let url = ctx.query['source-url'];
    try {
      let data = yield request.get(url);
      ctx.body = data.body
    } catch (err) {
      console.error("agent faild: %s", err)
      ctx.body = "not found"
    }
  }
}
module.exports = CorsCtrl
