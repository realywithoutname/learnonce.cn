let mongoose = require('mongoose')
let news = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
  createTime: Date,
  pubTime: Date,
  from: String,
  image: String,
  content: String,
  feedId: Object
});
module.exports = mongoose.model('news', news);