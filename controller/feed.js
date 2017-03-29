let FeedServive = require('./../service').Feed;
let BaseCtrl = require('./base');
// let Feed = new FeedServive();
class FeedCtrl extends BaseCtrl {
  constructor () {
    super(FeedServive);
  }
}
module.exports = FeedCtrl;
