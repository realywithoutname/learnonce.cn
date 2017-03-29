let Base = require('./base');
let DemoModel = require('./../model').Demo;

class Demo extends Base{
  constructor () {
    super(DemoModel);
  }
}
module.exports = Demo;
