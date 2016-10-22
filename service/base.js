let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
class Base {
  constructor (model) {
    this.model = model;
  }
  * find ({where = {}, fields = [], limit = 20, offset = 0, sort = {}}) {
    let query = this.model.find(where);
    query.limit(limit);
    query.skip(offset);
    query.sort(sort);
    query.select(fields.join(' '));
    return query;
  }
  * findOne ({where = {}, fields = []}) {
    let query = this.model.find(where);
    query.select(fields.join(''));
    query.limit(1);
    return query;
  }
  * findById (id, {fields = []}) {
    let query = this.model.findById(id);
    query.select(fields.join(''));
    return query;
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
