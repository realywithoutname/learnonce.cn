let mongoose = require('mongoose')
let news = new mongoose.Schema({
  content: String,
  title: String,
  createTime: {
    type: Date,
    default: new Date()
  }
});
module.exports = mongoose.model('note', news);