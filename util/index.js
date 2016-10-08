var parseString = require('xml2js').parseString;
const xml2js = function* (string) {
  return new Promise((resolve, reject) => {
    parseString(string, (err, json) => {
      if (err) {
        console.error('xml2js faild')
        reject(err);
      } else {
        resolve(json);
      }
    })
  });
}
const html2text = function (string) {
  return string.replace(/<\/?.+?>/g, '');
}
const parseZhiHu = function* (xml) {
  const {rss: {$, channel: [{title, description, lastBuildDate: [buildTime], item: items}]}} = yield xml2js(xml);
  let content = [];
  for (item of items) {
    let {title: [t], description: [desc], link: [l], pubDate: [d]} = item;
    content.push({
      title: t,
      description: html2text(desc),
      content: desc,
      link: l,
      pubTime: d ? new Date(d) : new Date()
    });
  }
  return {
    from: title[0],
    description: description[0],
    version: $.version,
    buildTime,
    content
  }
}
const parseSongshuhui = function* (xml) {
  const {rss: {$, channel: [{title, description, lastBuildDate: [buildTime], item: items}]}} = yield xml2js(xml);
  let content = [];
  for (item of items) {
    let {title: [t], description: [desc], 'content:encoded': [c], link: [l], pubDate: [d]} = item;
    content.push({
      title: t,
      description: html2text(desc),
      content: c,
      link: l,
      image: item.image ? '/img?source-url=' + item.image[0] : undefined,
      pubTime: d ? new Date(d) : new Date()
    });
  }
  return {
    from: title[0],
    description: description[0],
    version: $.version,
    buildTime,
    content
  }
}
const parseNanfang = function* (xml) {
  const {rss: {$, channel: [{title, description, item: items}]}} = yield xml2js(xml);
  let content = [];
  for (item of items) {
    let {title: [t], description: [desc], link: [l], pubDate: [d]} = item;
    content.push({
      title: t,
      description: html2text(desc),
      content: desc,
      link: l,
      pubTime: d ? new Date(d) : new Date()
    });
  }
  return {
    from: title[0],
    description: description[0],
    version: $.version,
    buildTime: new Date(),
    content
  }
}
const parseEngadget = function* (xml) {
  const {rss: {$, channel: [{title, description, item: items}]}} = yield xml2js(xml);
  let content = [];
  for (item of items) {
    let {title: [t], description: [desc], link: [l], pubDate: [d]} = item;
    content.push({
      title: t,
      description: html2text(desc),
      content: desc,
      link: l,
      pubTime: d ? new Date(d) : new Date()
    });
  }
  return {
    from: title[0],
    description: description[0],
    version: $.version,
    buildTime: new Date(),
    content
  }
}
const parse36kr = function* (xml) {
  const {rss: {$, channel: [{title, description, pubDate: [buildTime], item: items}]}} = yield xml2js(xml);
  let content = [];
  for (item of items) {
    let {title: [t], description: [desc], link: [l], pubDate: [d]} = item;
    content.push({
      title: t,
      description: html2text(desc),
      content: desc,
      link: l,
      pubTime: d ? new Date(d) : new Date()
    });
  }
  return {
    from: title[0],
    description: description[0],
    version: $.version,
    buildTime,
    content
  }
}
const parseWeiguanchang = function* (xml) {
  let data = yield xml2js(xml);
  const {rss: {$, channel: [{title, description, item: items}]}} = yield xml2js(xml);
  let content = [];
  for (item of items) {
    let {title: [t], description: [desc], link: [l]} = item;
    content.push({
      title: t,
      description: html2text(desc).substr(200),
      content: desc,
      link: l,
      pubTime: new Date()
    });
  }
  return {
    from: title[0],
    description: description[0],
    version: $.version,
    buildTime: new Date(),
    content
  }
}
const parseWeibo = function* (xml) {
  const {rss: {$, channel: [{title, description, lastBuildDate: [buildTime], item: items}]}} = yield xml2js(xml);
  let content = [];
  for (item of items) {
    let {title: [t], description: [desc], link: [l], pubDate: [d]} = item;
    let img = desc.match(/src="(.+)"/);
    content.push({
      title: t.substr(0, 25) + '...',
      description: t,
      content: desc,
      link: l,
      image: img === null ? undefined : img[1],
      pubTime: d ? new Date(d) : new Date()
    });
  }
  return {
    from: title[0],
    description: description[0],
    version: $.version,
    buildTime,
    content
  }
}
module.exports = {
  xml2js,
  parse36kr,
  parseWeibo,
  parseZhiHu,
  parseNanfang,
  parseEngadget,
  parseSongshuhui,
  parseWeiguanchang
}
