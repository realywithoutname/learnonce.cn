let NewsServive = require('./../service').News;
let BaseCtrl = require('./base');
const mongoose = require('mongoose')
class NewsCtrl extends BaseCtrl {
  constructor () {
    super(NewsServive);
  }
  * beforeFind (ctx, next) {
    let filter = ctx.request.query.filter

    if (filter.where && filter.where.feedId) {
      filter.where.feedId = mongoose.Types.ObjectId(filter.where.feedId)
    }
    yield next
  }
  * afterFind (ctx, next) {
    ctx.body.forEach((news) => {
      news.content = this._getFirstTagP(news.content)
    })
  }
  _getFirstTagP (data) {
    let p = data.match(/.*?<\/p>/);
    p = p === null ? data : p[0];
    let str = this._getString(p)
    return str;
  }
  _getString (str) {
    let imgSrc = str.match(/<img.+src="(.+?)"/)
    if (imgSrc !== null) {
      imgSrc = imgSrc[1];
    }
    str = str.replace(/<[^>]+>/g,"").substr(0, 250);
    return imgSrc === null ? str : str + '<img onerror="imgloadError()" src="' + imgSrc + '"><br>';
  }
}
module.exports = NewsCtrl;
