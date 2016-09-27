let mongoose = require('mongoose')
let tag = new mongoose.Schema({
  name: String,
  notes: Array,
  count: String
});
module.exports = mongoose.model('tag', tag);
