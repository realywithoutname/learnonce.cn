let DemoServive = require('./../service').Demo;
let BaseCtrl = require('./base');
// let Demo = new DemoServive();
class DemoCtrl extends BaseCtrl {
  constructor () {
    super(DemoServive);
  }
}
module.exports = DemoCtrl;
