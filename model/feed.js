let mongoose = require('mongoose')
let feeds = new mongoose.Schema({
  name: String,
  description: String,
  url: String,
  lastBuildTime: Date,
  version: String,
  parseFun: String
});
module.exports = mongoose.model('feeds', feeds);