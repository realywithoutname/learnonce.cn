var keys = require('../config/auth').key
module.exports = function* (ctx) {
  let finger = ctx.request.query.finger;
  if (!finger) {
    ctx.status = 403;
    return;
  }
  let index = finger.indexOf('T');
  let T = parseInt(finger.substr(index + 1));
  let k = finger.substr(0, index);
  for (let key of keys) {
    let finger = (key + T).toString(32);
    if (k === finger) {
      ctx.status = 200;
      return;
    } else {
      ctx.status = 403;
    }
  }
}
