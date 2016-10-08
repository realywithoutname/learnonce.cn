let request = require('koa-request');
let superagent = require('superagent');
let co = require('co');

let BaseService = require('./../service/base');
let {parseZhiHu, parseSongshuhui, parseNanfang, parseEngadget, parse36kr, parseWeiguanchang, parseWeibo} = require('./../util');
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
  let res = yield request.get(feed.toJSON().link);
  let news = yield parseNanfang(res.body);
  yield this.save(news, feed);
}
rss.engadget = function* (feed) {
  let res = yield request.get(feed.toJSON().link);
  let news = yield parseEngadget(res.body);
  yield this.save(news, feed)
}
rss.weiguanchang = function* (feed) {
  let res = yield request.get(feed.toJSON().link);
  let news = yield parseWeiguanchang(res.body);
  yield this.save(news, feed);
}
rss._36kr = function* (feed) {
  let res = yield request.get(feed.toJSON().link);
  let news = yield parse36kr(res.body);
  yield this.save(news, feed);
}
rss.weibo = function* (feed) {
  let res = yield request.get({
    url: 'http://rss.weibodangan.com/weibo/rss/1630461754/',
    headers: {
      Cookie:'_ga=GA1.2.255569230.1473326875; BDTUJIAID=9d108ddb6591ddde6e7f1135b72f013a',
      Host: 'rss.weibodangan.com',
      Referer: 'http://weibo.wbdacdn.com/user/1630461754/',
      'Upgrade-Insecure-Requests': 1,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
    }
  });
  let news = yield parseWeibo(res.body);
  yield this.save(news, feed);
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
      newsItem.description = newsItem.description;
      newsItem.content = newsItem.content.replace(/<img.+?src=\"/g, '<img src="/img?source-url=');
      newsItem.content = newsItem.content.replace(/\<script.+?\<\/script\>|\<style.+?\<\/style\>/g, ' ');
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
    co(rss[feed.parseFun](feed)).catch((e) => {
      console.log("co error: %s", e, feed)
    });
  }
}
module.exports = function () {
  let i = 1;
  co(start()).catch((e) => {
    console.log('co error: start task:', e)
  });;
  setInterval(() => {
    co(start()).catch((e) => {
      console.log('co error: start task %s', e)
    });
    console.log("task run %s again", ++ i);
  }, 1000 * 60 * 60);
}
