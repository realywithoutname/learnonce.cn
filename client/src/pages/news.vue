<template>
  <div class="content container">
    <div class="menu-bar">
      <a><i class="material-icons" @click="smallMenuShow = true">apps</i></a>
      <a class="hidden-small-down" v-link="{path: '/'}"><i class="material-icons">home</i></a>
      <a class="hidden-small-down" v-if="$root.level" v-link="{path: '/note/create'}">
        <i class="material-icons">border_color</i>
      </a>
      <a><i class="material-icons" @click="toTop">vertical_align_top</i></a>
      <div v-show="smallMenuShow" class="">
        <div @click="smallMenuShow = false" class="scrim"></div>
        <ul id="feeds" class="feeds zindex-4">
          <li @click="loadAll">
            <i class="material-icons indigo-5 feed-icon">all_inclusive</i>
            <span class="feed-name">ALL</span>
          </li>
          <li @click.stop="getStarNews">
            <i class="material-icons feed-icon red-5">favorite</i>
            <span class="feed-name">收藏</span>
          </li>
          <li @click.stop="getFeedNews(feed._id)" v-for="feed in feeds">
              <img class="feed-icon":src="feed.icon" alt="" />
              <span class="feed-name">{{feed.name}}</span>
          </li>
          <!-- <li @click.stop="addFeed">
            <i class="material-icons blue-5 feed-icon">add</i>
            <span class="feed-name">添加</span>
          </li> -->
        </ul>
      </div>
    </div>
    <header class="nav-bar hidden-small-and-up xs-8">
      <a class="hidden-small-up home-icon" v-link="{path: '/'}"><i class="material-icons">home</i></a>
      <a class="hidden-small-up edit-icon" v-if="$root.level" v-link="{path: '/note/create'}">
        <i class="material-icons">border_color</i>
      </a>
    </header>
    <div class="col xs-8 s-6 m-4 l-6 news-header xl-4 x-center">
      <div class="logo">
        <img class="" src="/static/image/logo.png" alt="" />
      </div>
      <div class="description">
        <h3>刘建东</h3>
        <p>
          <a href="mailto:erchuochuo@163.com">erchuochuo@163.com</a>
        </p>
        <hr>
        <p>该页面所有内容来自RSS订阅,仅供个人阅读</p>
      </div>
    </div>
    <div class="col xs-8 s-6 m-4 l-6 xl-4 news x-center">
      <scroller v-ref:scroller>
        <div slot="scroller-body">
          <div class="" :class="'col-' + $index + '-List'"
            v-for="column in $refs.scroller.columns">
            <div class="col xs-8" v-for="item in column">
              <div track-by="_id" class="card">
                <header>
                  <a v-html="item.title" class="card-title" @click.stop="readMore(item)">
                  </a>
                </header>
                <div class="content">
                  <p v-html="item.content"></p>
                </div>
                <footer class="card-footer">
                  <span class="from" v-html="item.from"></span>
                  <i>{{item.pubTime | date 'MM/dd HH:mm'}}</i>
                  <div class="right">
                    <a @click.stop="setStar(item._id)">
                      <i v-show="!item.star"  class="material-icons star">star_border</i>
                    </a>
                    <a v-link="{path: '/news/' + item._id}" target="_blank" >
                      <i class="material-icons">send</i>
                    </a>
                  </div>
                </footer>
              </div>
            </div>
          </div>
          <div @click="loadMore" class="col xs-8 load-more">
            <i class="material-icons">expand_more</i>
          </div>
        </div>
      </scroller>
    </div>
    <modal id="news-modal" class="body-sroll" :show.sync="detailShow" :title="curNews.title">
      <p class="news-content" v-html="curNews.content"></p>
      <footer class="xs-8" slot="footer">
        <a :href="curNews.link" target="_blank" class="flat-btn">阅读原文</a>
        <a v-link="{path: '/news/' + curNews._id}" target="_blank" class="flat-btn">本文地址</a>
      </footer>
    </modal>
  </div>
</template>

<script>
import scroller from 'components/Scroller'
export default {
  components: { scroller },
  data () {
    return {
      feeds: [],
      mood: false,
      detailShow: false,
      curNews: {},
      timestamp: new Date().getTime(),
      smallMenuShow: false,
      showFeedEdit: false,
      filter: {
        where: {},
        limit: 20,
        offset: 0,
        fields: ['id', 'title', 'star', 'content', 'from', 'pubTime', 'image'],
        sort: {createTime: 'desc'}
      }
    }
  },
  ready () {
    this.query()
    this.getFeeds()
    this.$root.needList = true
    this.$root.sideCtrl = true
    this.$refs.scroller.$on('pull:start', this.loadMore)
  },
  methods: {
    query () {
      this.smallMenuShow = false
      this
        .News
        .find({filter: this.filter})
        .then((res) => {
          let data = res.json()
          this.$refs.scroller.$emit('data:push', data)
          if (!data[data.length - 1]) {
            return
          }
          this.timestamp = new Date(data[data.length - 1].createTime).getTime()
        })
    },
    loadMore () {
      this.filter.offset = this.filter.offset + this.filter.limit
      this.query()
    },
    getFeeds () {
      this.Feed.find({})
        .then((res) => {
          this.feeds = res.json()
        })
    },
    imgError (e) {
      e.target.src = ''
    },
    readMore (news) {
      window.lock('#news-modal')
      this.curNews = news
      this.findOneNews(news._id)
      this.detailShow = true
    },
    findOneNews (id) {
      this.News.findById({id}, {})
        .then((res) => {
          this.curNews = res.json()
        })
    },
    setStar (id) {
      this.News.updateById({id}, {star: true})
        .then(() => {
          this.$toast('收藏成功', 'top')
        })
    },
    getFeedNews (id) {
      this.filter.where = {feedId: id}
      this.filter.offset = 0
      this.$refs.scroller.$emit('data:empty')
      this.$root.menu = false
      this.query()
    },
    addFeed () {

    },
    loadAll () {
      this.filter.where = {}
      this.filter.offset = 0
      this.$refs.scroller.$emit('data:empty')
      this.query()
    },
    getStarNews () {
      this.filter.where = {star: true}
      this.filter.offset = 0
      this.$root.menu = false
      this.$refs.scroller.$emit('data:empty')
      this.query()
    }
  },
  watch: {
    'detailShow' (isView) {
      if (!isView) {
        window.unlock('#news-modal')
      }
    },
    smallMenuShow (isshow) {
      if (isshow) {
        window.lock('#feeds')
      } else {
        window.unlock('#feeds')
      }
    }
  },
  events: {
    'scroll:top' (top) {
      if (!this.$root.needHead) {
        this.$root.needHead = true
      }
    },
    'scroll:bottom' (top) {
      if (top >= 64 && this.$root.needHead) {
        this.$root.needHead = false
      }
    }
  }
}
</script>
<style media="screen">
#news-modal .news-content * {
  max-width: 100% !important;
  height: auto;
}
</style>
<style lang="css" scoped>
  hr {
    border-color: rgba(153, 153, 153, 0.5);
  }
  .content > .news-header {
    height: 10rem;
    background: #fafafa;
    margin-top: 2rem;
    margin-bottom: 2rem;
    padding: 1rem;
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  }
  .content > .news-header .logo {
    height: 8rem;
    border-radius: 100%;
    background: #3f51b5;
    width: 8rem;
    padding: 1rem;
    box-sizing: border-box;
  }
  .content > .news-header .logo img {
    height: 6rem;
    transform: scale(0.8);
  }
  .content > .news-header .description {
    height: 8rem;
    flex: auto;
    padding-left: 1rem;
  }
  .content > .news-header .description h3 {
    margin: 0;
    margin-top: 1rem;
    margin-bottom: 0.3rem;
    color: #4c4c4c;
  }
  .content > .news-header .description a {
    color: #999999;
  }
  @media (max-width: 600px) {
    .nav-bar {
      box-shadow: none;
    }
    .content > .news-header {
      margin-top: 0;
      margin-bottom: 0;
      background: #3f51b5;
      box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.4);
      position: fixed;
      top: 3rem;
      z-index: 22;
      height: 11rem;
    }
    .content > .news-header .description h3 {
      color: #fff;
    }
    .content > .news-header .description p {
      color: #f2f2f2;
    }
    .news {
      margin-top: 13.5rem;
    }
  }
  .news {
    background: #fafafa;
    /*margin-bottom: 4rem;*/
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  }
  .card, .card:hover {
    background: #fafafa;
    margin-bottom: 1rem;
    box-shadow: none;
    padding-bottom: 1rem;
    border-bottom: #d7d7d7 2px dashed;
  }
  .card .card-title {
    font-size: 1.2rem;
    font-weight: 500;
    color: #4c4c4c;
  }
  .card .card-title:hover {
    color: #828d95;
  }
  .card header, .card footer {
    border: none;
  }
  .card-footer {
    color: #828d95;
  }
  .card-footer a, .card-footer a i {
    color: #828d95;
    width: 2.5rem;
    text-align: right;
  }
  .chips > .item img + .title {
    word-spacing: nowrap;
    display: initial;
  }
  #news-modal footer .flat-btn {
    height: 48px;
    line-height: 48px;
    float: right;
  }
  #news-modal footer a.flat-btn {
    color: #999999;
    font-size: 0.9rem;
  }
  .menu-bar {
    bottom: 11rem;
  }
  .feeds {
    width: 400px;
    overflow: auto;
    position: absolute;
    z-index: 99;
    background: #fafafa;
    right: 0;
    bottom: 0;
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    overflow-x: hidden;
    justify-content: flex-start;
    align-content: flex-start;
    padding: 1rem;
    z-index: 999;
    border-radius: 5px;
  }
  .feeds li {
    display: flex;
    flex-flow: column;
    flex-shrink: 0;
    flex-grow: 0;
    width: 100px;
    height: 100px;
    overflow: hidden;
    text-align: center;
    justify-content: center;
    align-items: center;
  }
  .feeds .feed-icon {
    width: 50px;
    height: 50px;
    flex-shrink: 0;
  }
  .feeds i.feed-icon {
    font-size: 32px;
    line-height: 50px;
  }
  .feeds .feed-name {
    color: #444;
    flex-shrink: 0;
    white-space: nowrap;
    width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (max-width: 600px) {
    .menu-bar {
      bottom: 5rem;
    }
    .feeds {
      position: fixed;
      top: 12rem;
      bottom: 2rem;
      right: 1.5rem;
      left: 1.5rem;
      width: auto;
    }
    .home-icon {
      top: 0;
      left: 1rem;
    }
    .edit-icon {
      top: 0;
      right: 1rem;
    }
  }
</style>
