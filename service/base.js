let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
class Base {
  constructor (model) {
    this.model = model;
  }
  * find ({where = {}, fields = [], limit = 20, offset = 0, sort = {}}) {
    return this.model.find(where).limit(limit).skip(offset).sort(sort).select(fields.join(' '));
  }
  * findOne ({where = {}, fields = []}) {
    return this.model.find(where).select(fields.join('')).limit(1);
  }
  * findById (id, {fields = []}) {
    return this.model.findById(id).select(fields.join(''));
  }
  * updateById (id, data) {
    return this.model.findByIdAndUpdate(id, data);
  }
  * insertMany (array) {
    return this.model.insertMany(array);
  }
  * create (instance) {
    return this.model.insertMany([instance])
  }
}
module.exports = Base
