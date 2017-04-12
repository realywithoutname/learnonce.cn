let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
class Base {
  constructor (model) {
    this.model = model;
  }
  * find ({where = {}, fields = [], limit = 20, offset = 0, sort = {}}) {
    if (where.$like) {
      let like = where.$like
      delete where.$like
      Object.keys(like).forEach((key) => {
        where[key] = new RegExp(like[key], 'ig')
      })
    }
    return this.model.find(where).limit(limit).skip(offset).sort(sort).select(fields.join(' '));
  }
  * findOne ({where = {}, fields = []}) {
    return this.model.find(where).select(fields.join('')).limit(1);
  }
  * findById (id, {fields = []}) {
    return this.model.findById(id).select(fields.join(''));
  }
  * updateById (id, data) {
    data.updateTime = new Date()
    data = yield this.model.findByIdAndUpdate(id, data);
    return this.model.findById(data._id);
  }
  * insertMany (array) {
    return this.model.insertMany(array);
  }
  * create (instance) {
    let data = yield this.model.create(instance)
    console.log(data);
    return this.model.findById(data._id);
  }
  * distroyById (id) {
    return this.model.findByIdAndRemove(id)
  }
  * destroy (where) {
    // console.log(this.find(filter))
    return this.model.remove(where)
  }
}
module.exports = Base
