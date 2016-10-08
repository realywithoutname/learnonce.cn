const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose')

module.exports = (() => {
  const files = fs.readdirSync(__dirname);
  let Models = {};
  files.forEach((file) => {
    if (file === 'index.js') {
      return
    }
    let conf = require(path.join(__dirname, file));
    let name = conf.name.replace(/(\w)/, function(v){return v.toUpperCase()});
    Models[name] = mongoose.model(conf.plural, new mongoose.Schema(conf.prototype));
  });
  return Models
})()
