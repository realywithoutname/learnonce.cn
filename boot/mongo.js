let mongoose = require('mongoose')
let mongo = ({develop, production}) => {
  if (process.env.NODE_ENV === 'production') {
    mongoose.connect(production.uri, production.option, (err, res) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
    })
  } else {
    mongoose.connect(develop.uri, develop.option, (err, res) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
    })
  }
}
module.exports = mongo