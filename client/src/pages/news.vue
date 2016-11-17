<template>
  <div class="content container">
    <!-- <v-header></v-header> -->
    <side>
      <div slot="header" class="nav-bar-equal divider">
        <a href="#" class="brand  indigo-5">A·O</a>
        <span class="hidden-small-and-up">if you know, please more</span>
      </div>
      <div slot="body" class="">
        <ul class="chips zindex-0 par-bg">
          <li>
            <h3>我的</h3>
          </li>
          <li @click.stop="getStarNews" class="item divider">
            <!-- <i class="material-icons chip-image red-5">favorite</i> -->
            <span class="title">收藏</span>
          </li>
          <li>
            <h3>RSS 源</h3>
          </li>
          <li @click.stop="getFeedNews(feed._id)"  class="item" v-for="feed in feeds">
              <!-- <img :src="feed.icon" alt="" /> -->
              <span class="title">{{feed.name}}</span>
          </li>
        </ul>
      </div>
    </side>
    <div class="col l-left-2 m-left-2 s-left-3 l-10 m-6 s-4 xs-8">
      <scroller :l-col="3" :m-col="2" :s-col="1" v-ref:scroller>
        <!-- <div slot="header" class="nav-bar-equal"></div> -->
        <div slot="scroller-body">
          <div class=""  :class="'col l-4 m-4 s-8 xs-8 col-' + $index + '-List'" v-for="column in $refs.scroller.columns">
            <div class="col xs-8" v-for="item in column">
              <div track-by="_id" class="card">
                <header>
                  <a href="javascript:void(0)" @click.stop="readMore(item)" v-html="item.title" class="card-title"></a>
                </header>
                <div class="content">
                  <a v-link="{path: '/news/' + item._id}" target="_blank"><p v-html="item.content"></p>
                </a>
                </div>
                <footer class="card-footer">
                  <span class="title" v-html="item.from"></span>
                  <a class="right">
                    <i v-show="!item.star" @click.stop="setStar(item._id)" class="material-icons star">star_border</i>
                    <i class="material-icons">fullscreen</i>
                  </a>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </scroller>
    </div>
    <side-nav class="col xs-8 s-4 l-3" :title="sideNavTitle" :show.sync="sideNavShow">
    </side-nav>
    <side-nav class="col xs-8" :title="curNews.title" :show.sync="detailShow">
      <div class="news-detail col xs-8 s-6 m-4 l-4 s-left-1 m-left-2 l-left-4">
        <div class="xs-8" v-html="curNews.content"></div>
        <div class="right padding">
          <a :href="curNews.link" target="_blank">阅读原文</a>
          <a v-link="{path: '/news/' + curNews._id}" target="_blank">本文地址</a>
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
      sideNavTitle: '',
      timestamp: new Date().getTime(),
      sideNavShow: false,
      lastCardEl: null,
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
      window.lock('body')
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
    '$root.filterCtrl' (it) {
      if (it) {
        this.sideNavShow = true
        this.$root.filterCtrl = false
        this.sideNavTitle = '选择过滤条件'
      }
    },
    'detailShow' (isView) {
      if (!isView) {
        window.unlock('body')
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
  .card {
    box-shadow: 0 0 0.125rem 0.125rem rgba(153, 153, 153, 0.75);
    background: transparent;
  }
  .card header, .card footer {
    border: none;
  }
  .card .content {
    max-height: 300px;
    overflow: hidden;
  }
  /*.card .content:hover {
    overflow: auto;
  }*/
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
  .news-detail {
    margin-top: 1.5rem;
  }
</style>
