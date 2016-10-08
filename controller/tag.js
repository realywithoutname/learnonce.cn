let BaseCtrl = require('./base');
let TagService = require('../service/tag');

class TagCtrl extends BaseCtrl {
  constructor () {
    super(TagService);
  }
}
module.exports = TagCtrl;
