let mongoose = require('mongoose')
let news = new mongoose.Schema({
  content: String,
  title: String,
  description: String,
  tags: String,
  createTime: {
    type: Date,
    default: new Date()
  }
});
module.exports = mongoose.model('note', news);
