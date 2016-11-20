<template>
  <div class="content container">
    <div class="menu-bar hidden-small-down top zindex-4 col l-2 m-2 s-2">
      <a v-link="{path: '/'}"><i class="material-icons">home</i></a>
      <a v-link="{path: '/note/create'}"><i class="material-icons">border_color</i></a>
    </div>
    <div class="menu-bar zindex-4 col l-2 m-2 s-2">
      <a class="hidden-small-and-up"><i class="material-icons" @click="smallMenuShow = true">menu</i></a>
      <a  class="hidden-small-and-up" v-link="{path: '/'}"><i class="material-icons">home</i></a>
      <a  class="hidden-small-and-up" v-link="{path: '/note/create'}"><i class="material-icons">border_color</i></a>
      <a><i class="material-icons" @click="toTop">vertical_align_top</i></a>
    </div>
    <div :class="{'hidden-small-down': !smallMenuShow}" class="menus scrim col l-2 m-2 s-2">
      <i class="material-icons close" @click="smallMenuShow = false">close</i>
      <ul class="chips zindex-4">
        <li class="title">
          <h3></h3>
        </li>
        <li @click.stop="getStarNews" class="item">
          <i class="material-icons chip-image red-5">favorite</i>
          <span class="title">收藏</span>
        </li>
        <li class="title">
          <h3>RSS 源</h3>
        </li>
        <li @click.stop="getFeedNews(feed._id)"  class="item" v-for="feed in feeds">
            <img :src="feed.icon" alt="" />
            <span class="title">{{feed.name}}</span>
        </li>
      </ul>
    </div>
    <div class="col news l-left-2 m-left-2 s-left-3 l-10 m-6 s-4 xs-8">
      <scroller :l-col="3" :m-col="2" :is-top.sync="toTop" :s-col="1" v-ref:scroller>
        <div slot="scroller-body">
          <div class=""  :class="'col l-4 m-4 s-8 xs-8 col-' + $index + '-List'" v-for="column in $refs.scroller.columns">
            <div class="col xs-8" v-for="item in column">
              <div track-by="_id" class="card">
                <header>
                  <a v-html="item.title" class="card-title"  @click.stop="readMore(item)"></a>
                </header>
                <div class="content">
                  <p v-html="item.content"></p>
                </div>
                <footer class="card-footer">
                  <span class="title" v-html="item.from"></span>
                  <div class="right">
                    <a><i v-show="!item.star" @click.stop="setStar(item._id)" class="material-icons star">star_border</i></a>
                    <a v-link="{path: '/news/' + item._id}" target="_blank" > <i class="material-icons">send</i></a>
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
    <side-nav class="col xs-8 wood-bg" :title="curNews.title" :show.sync="detailShow">
      <div class="col xs-8 s-6 m-4 l-4 s-left-1 m-left-2 l-left-4">
        <div class="news-detail card">
          <p class="content" v-html="curNews.content"></p>
          <footer>
            <a :href="curNews.link" target="_blank">阅读原文</a>
            <a v-link="{path: '/news/' + curNews._id}" target="_blank">本文地址</a>
          </footer>
        </div>
      </div>
    </side-nav>
  </div>
</template>

<script>
import side from 'components/Side'
import vHeader from 'components/Head'
import note from 'components/Note'
import sideNav from 'components/SideNav'
import scroller from 'components/Scroller'
export default {
  components: {side, note, sideNav, scroller, vHeader},
  data () {
    return {
      feeds: [],
      mood: false,
      detailShow: false,
      curNews: {},
      timestamp: new Date().getTime(),
      smallMenuShow: false,
      filter: {
        where: {},
        limit: 20,
        offset: 0,
        fields: ['id', 'title', 'star', 'content', 'from', 'createTime', 'image'],
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
      window.lock('#sideNavBody')
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
        window.unlock('#sideNavBody')
      }
    },
    smallMenuShow (isshow) {
      if (isshow) {
        window.lock('.menus ul')
      } else {
        window.unlock('.menus ul')
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

<style lang="css" scoped>
  .news {
    margin-bottom: 4rem;
  }
  .card {
    box-shadow: 0 0 0.125rem 0.125rem rgba(209, 190, 175, 0.5);
    background: #fff;
  }
  .card:hover {
    box-shadow: 0.1rem 0.5rem 0.2rem 0.2rem  rgba(144, 133, 123, 0.35);
    background: #fff;
  }
  .card .card-title {
    font-size: 1.3rem;
  }
  .card header, .card footer {
    border: none;
  }
  .card .content {
    max-height: 300px;
    overflow: hidden;
  }
  .card .content img {
    width: 100%;
  }
  .card .content-full {
    max-height: initial;
    overflow: auto;
  }
  .card-title {
    color: #222;
    font-weight: 600;
  }
  .card-title:hover {
    color: #2793C7;
  }
  .card-footer a, .card-footer a i {
    color: #9a9a9a;
    width: 2.5rem;
    text-align: right;
  }
  .news-detail {
    margin-top: 1.5rem;
    background: #fff;
    border-radius: 5px;
  }
  .news-detail.card .content {
    max-height: initial;
    overflow: auto;
  }
  .news-detail footer {
    display: flex;
    width: 100%;
    box-sizing: border-box;
  }
  .news-detail footer a {
    flex: 1;
    text-align: center;
    color: #777;
  }
  @media (max-width: 600px) {
    .news-detail {
      margin-top: 1.5rem;
      background: #fff;
      margin: 0.5rem;
      width: calc(100% - 1rem);
      padding: 0.5rem;
      border-radius: 5px;
    }
  }
  .chips > .item img + .title {
    word-spacing: nowrap;
    display: initial;
  }

</style>
