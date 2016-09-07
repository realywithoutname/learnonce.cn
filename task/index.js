let request = require('koa-request');
let co = require('co');

let BaseService = require('./../service/base');
let {parseZhiHu, parseSongshuhui, parseNanfang, parseEngadget, parse36kr, parseWeiguanchang} = require('./../util');
let {Feed, News} = require('./../model');

Feed = new BaseService(Feed);
News = new BaseService(News);

let rss = {}

rss.zhihuribao = function* (feed) {
  let res = yield request.get(feed.toJSON().link);
  let news = yield parseZhiHu(res.body);
  yield this.save(news, feed);
}
rss.songshuhui = function* (feed) {
  let res = yield request.get(feed.toJSON().link);
  let news = yield parseSongshuhui(res.body);
  yield this.save(news, feed);
}
rss.nanfanzhoukan = function* (feed) {
  // let res = yield request.get(feed.toJSON().link);
  // let news = yield parseNanfang(res.body);
  // yield this.save(news, feed);
}
rss.engadget = function* (feed) {
  // let res = yield request.get(feed.toJSON().link);
  // let news = yield parseEngadget(res.body);
  // yield this.save(news, feed)
}
rss.weiguanchang = function* (feed) {
  let res = yield request.get(feed.toJSON().link);
  let news = yield parseWeiguanchang(res.body);
  console.log(news.coontent[0])
  // yield this.save(news, feed);
}
rss._36kr = function* (feed) {
  let res = yield request.get(feed.toJSON().link);
  let news = yield parse36kr(res.body);
  yield this.save(news, feed)
}
rss.save = function* (news, feed) {
  try {
    for (let newsItem of news.content) {
      let ret = yield News.findOne({where: {title: newsItem.title}, filds: 'id'}) 
      if (ret.length > 0) {
        delete newsItem
        continue
      }
      newsItem.from = news.from;
      let imgs = newsItem.content.match(/img src="(.*?)"/);
      newsItem.description = newsItem.description;
      newsItem.content = newsItem.content.replace(/<img.+?src=\"/g, '<img src="/img?source-url=');
      newsItem.content = newsItem.content.replace(/\<script.+?\<\/script\>|\<style.+?\<\/style\>/g, ' ');
      newsItem.image = newsItem.image || (imgs === null ? undefined : '/img?source-url=' + imgs[1]);
      newsItem.createTime = new Date();
      newsItem.feedId = feed._id
    }
    if (new Date(news.buildTime) > new Date(feed.lastBuildTime)) {
      if (feed.name) {
        yield Feed.updateById(feed.id, {
          lastBuildTime: news.buildTime
        });
      } else {
        yield Feed.updateById(feed.id, {
          lastBuildTime: news.buildTime,
          name: news.from,
          description: news.description,
          version: news.version
        });
      }
      yield News.insertMany(news.content);
    }
  } catch (err) {
    console.error(err)
  }
}

const loadFeeds = function* () {
  return yield Feed.find({});
}
const start = function* () {
  let feeds = yield loadFeeds();
  for (let feed of feeds) {
    co(rss[feed.parseFun](feed));
  }
}
module.exports = function () {
  let i = 1;
  co(start());
  setInterval(() => {
    co(start());
    console.log("task run %s again", ++ i);
  }, 1000 * 60 * 60);
}