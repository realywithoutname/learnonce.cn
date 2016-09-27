let Base = require('./base');
let TagModel = require('./../model').Tag;

class Tag extends Base{
  constructor () {
    super(TagModel);
  }
}
module.exports = Tag;
