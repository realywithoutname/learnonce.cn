<template>
  <div class="content container">
    <side>
      <div slot="header" class="nav-bar-equal">
        <a href="#" class="brand  indigo-5">A·O</a>
        <span class="hidden-small-and-up">if you know, please more</span>
      </div>
      <ul slot="body" class="collections par-bg">
        <li class="collection divider" v-for="feed in feeds">
          <div class="content">
            <span class="title">{{feed.name}}</span>
            <p>
              {{feed.lastBuildTime | date 'YYYY-MM-DD HH:mm'}}
              <br>
              {{feed.description}}
            </p>
          </div>
        </li>
      </ul>
    </side>
    <div class="col l-left-2 m-left-2 s-left-3 l-10 m-6 s-4 xs-8">
      <scroller :l-col="3" :m-col="2" :s-col="1" v-ref:scroller>
        <div slot="header" class="nav-bar-equal"></div>
        <div slot="scroller-body">
          <div class=""  :class="'col l-4 m-4 s-8 xs-8 col-' + $index + '-List'" v-for="column in $refs.scroller.columns">
            <div class="col xs-8" v-for="item in column">
              <div track-by="_id" class="card">
                <header>
                  <h2 v-html="item.title" class="card-title"></h2>
                </header>
                <div  v-if="item.image" class="card-image">
                  <img @error="imgError($event)" :src="item.image">
                </div>
                <div class="content">
                  <p v-html="item.description.substr(0, 150).concat('...')"></p>
                </div>
                <footer class="card-footer">
                  <span>来自：{{item.from}} {{item.pubTime | date 'YYYY/MM/dd HH:mm'}}</span>
                  <a href="javascript:void(0)" @click="readMore(item)">阅读全文</a>
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
      <note :content="curNews.content"></note>
    </side-nav>
  </div>
</template>

<script>
import side from 'components/Side'
import note from 'components/Note'
import sideNav from 'components/SideNav'
import scroller from 'components/Scroller'
export default {
  components: {side, note, sideNav, scroller},
  data () {
    return {
      feeds: [],
      mood: false,
      detailShow: false,
      curNews: {},
      sideNavTitle: '',
      timestamp: new Date().getTime(),
      sideNavShow: false,
      filter: {
        where: {},
        limit: 20,
        offset: 0,
        filds: ['id', 'title', 'description', 'from', 'createTime', 'image'],
        sort: {createTime: 'desc'}
      }
    }
  },
  ready () {
    this.query()
    this.getFeeds()
    this.$root.needList = true
    // this.$root.sideCtrl = true
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
          // this.itemIist.push(...res.json())
          // if (this.itemIist.length === 0) {
          //   return
          // }
          if (data[data.length - 1]) {
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

</style>
