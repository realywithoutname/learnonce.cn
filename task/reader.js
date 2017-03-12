const Reader = require('../service/reader')

const co = require('co')

const BaseService = require('../service/base');

const {Feed, News} = require('./../model');

const FeedModel = new BaseService(Feed);

const NewsModel = new BaseService(News);

let reader = new Reader()

function formatItem (item) {
  item.content = item.content.replace(
    /<img.+?src=\"/g, '<img onerror="imgloadError()" src=\"'
  ).replace(
    /\<script.+?\<\/script\>|\<style.+?\<\/style\>/g, ' '
  );
  return item
}

reader.on('news-fecthed', (data) => {
  co(function* () {

    let result = []

    for (let item of data) {
      let ids = yield NewsModel.findOne({where: {link: item.link}, fields: ['id']})
      if (!ids.length) {
        formatItem(item)
        result.push(item)
      }
    }

    if (result.length) {
      yield NewsModel.insertMany(result)
    }
  }).catch((err) => {
    console.error(err);
  })
})

function* loadReader () {
  let feeds = yield FeedModel.find({})
  feeds.forEach((feed) => {
    feed = feed.toJSON()
    feed.url = feed.link
    reader.add(Object.assign({}, feed, {refresh: 60 * 60 * 1000}))
  })
}

function IntervalClearFeed () {
  function* clear (date) {
    yield NewsModel.destroy({createTime: {$lt: new Date(date)}})
  }
  setInterval(() => {
    let date = new Date().getTime() - 2 * 24 * 60 * 60 * 1000
    co(clear(date))
  }, 2 * 24 * 60 * 60 * 1000)
}

co(function* () {
  IntervalClearFeed()
  yield loadReader()
}).catch((err) => {
  console.log(err);
})



module.exports = {}
