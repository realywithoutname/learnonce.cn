let Base = require('./base');
let NewsModel = require('./../model').News;

class News extends Base{
  constructor () {
    super(NewsModel);
  }
}
module.exports = News;