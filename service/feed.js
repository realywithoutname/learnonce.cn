let Base = require('./base');
let FeedModel = require('./../model').Feed;

class Feed extends Base{
  constructor () {
    super(FeedModel);
  }
}
module.exports = Feed;
