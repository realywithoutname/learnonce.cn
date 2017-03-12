const feedParser = require('feedParser')

const request = require('request')

const TinyEmitter = require('tiny-emitter')

const _ = require('lodash')

class Reader extends TinyEmitter {
  constructor () {
    super()
    this.feeds = []
  }
  add (feed) {
    this._validateFeed(feed)
    this._addOrUpdateFeed(feed)
    return this.feeds
  }
  remove (feed) {
    this._removeFromList(feed)
  }
  _addOrUpdateFeed (feed) {
    let inListFeed = this._findFeed(feed)
    if (inListFeed) {
      this._removeFromList(inListFeed)
    }
    this._addToList(feed)
  }
  _addToList (feed) {
    feed.setInterval = this._createSetInterval(feed)
    this.feeds.push(feed)
  }
  _createSetInterval (feed) {
    this.fetch(feed.link).then(data => this.formatRequest(data, feed))
    return setInterval(() => {
      this.fetch(feed.link).then(data => this.formatRequest(data, feed))
    }, feed.refresh)
  }
  formatRequest (items, feed) {
    let data = items.map(({
      title, description, link, pubDate: pubTime
    }) => ({
      title,
      description,
      content: description,
      link,
      pubTime,
      createTime: new Date(),
      feedId: feed._id,
      from: feed.name
    }))
    this.emit('news-fecthed', data)
  }
  _removeFromList (feed) {
    if (feed) {
      clearInterval(feed.setInterval)
      _.remove(this.feeds, {_id: feed._id})
    }
  }
  _findFeed (feed) {
    return _.find(this.feeds, {
      _id: feed._id
    })
  }
  _validateFeed (feed) {
    if (!feed) {
      throw {
        type: 'null value',
        message: 'You must call #add method whit a feed object'
      }
    }
    if (!feed.url || typeof feed.url !== 'string' || feed.url === '') {
      throw {
        type: 'Invalid value',
        message: 'The feed object should hava an "url" key with string value'
      }
    }
    if (!feed._id) {
      throw {
        type: 'Invalid value',
        message: 'The feed object should have an "_id" key with ObjectId value'
      }
    }
  }
  fetch (url) {
    let instance = this
    let parser = new feedParser({addmeta: false})
    let req = request(url)
    let data = []
    return new Promise((resolve, reject) => {
      req.on('error', reject)
      parser.on('error', reject)
      req.on('end', () => resolve(data))
      req.on('response', function (res) {
        if (res.statusCode !== 200) {
          this.emit('error', new Error('Bad status code'))
        } else {
          this.pipe(parser)
        }
      })
      parser.on('readable', function () {
        let item
        while (item = this.read()) {
          data.push(item)
        }
      })
    }).catch((err) => {
      console.log("Reader fetch error: %s", err);
    })
  }
}

module.exports = Reader
