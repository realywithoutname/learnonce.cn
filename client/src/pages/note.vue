<template>
  <div class="container">
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
    <div  :class="{'hidden-small-down': !smallMenuShow}" class="menus scrim col l-2 m-2 s-2">
      <i class="material-icons close" @click="smallMenuShow = false">close</i>
      <ul class="collections">
        <li class="title">
          <h3>Tags</h3>
        </li>
        <li class="tag" v-for="tag in tags">
          <a>{{tag.name}}<b>{{tag.count}}</b></a>
        </li>
      </ul>
    </div>
    <div class="col notes l-left-2 m-left-2 s-left-3 l-10 m-6 s-4 xs-8">
      <div class="col xs-8 m-6 l-6 m-left-1 l-left-3">
        <ul class="collections  zindex-2">
          <li v-for="note in notes" class="collection divider">
            <a v-link="{path: '/note/' + note._id}">
              <div class="content">
                <h2 class="title">{{note.title}}</h2>
                <time>{{note.createTime | date 'YYYY-MM-DD'}}</time>
                <p v-text="note.description"></p>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div v-show="!noData" @click="loadMore" class="col xs-8 load-more">
        <i class="material-icons">expand_more</i>
      </div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import vHeader from 'components/Head'
import hljs from 'highlight.js'
import side from 'components/Side'
import './../assets/style/markdown.css'
marked.setOptions({
  highlight: function (code, lang) {
    return hljs.highlightAuto(code, [lang]).value
  }
})
export default {
  name: 'notes',
  data () {
    return {
      filter: {
        limit: 20,
        offset: 0,
        fields: ['id', 'title', 'createTime', 'description', 'tags'],
        sort: {createTime: 'desc'}
      },
      notes: [],
      tags: [],
      noData: false,
      smallMenuShow: false
    }
  },
  ready () {
    this.query()
    this.getTags()
    // this.$root.sideCtrl = true
    this.$root.needNote = true
  },
  components: {side, vHeader},
  methods: {
    query () {
      this
        .Note
        .find({filter: this.filter})
        .then((res) => {
          let notes = res.json()
          if (notes.length === 0) {
            this.noData = true
            return
          }
          for (let note of notes) {
            note.read = false
            note.content = ''
          }
          this.notes = notes
        })
    },
    loadMore () {
      this.filter.offset = this.notes.length
      this.query()
    },
    getTags () {
      this.Tag.find({filter: {fields: ['id', 'name', 'count']}})
        .then((res) => {
          this.tags = res.json()
        })
    }
  },
  filters: {
    marked: marked
  },
  watch: {
    '$root.noting' (val) {
      if (val) {
        this.$router.go('/notes/editor')
      }
    },
    smallMenuShow (isshow) {
      if (isshow) {
        window.lock('.menus ul')
      } else {
        window.unlock('.menus ul')
      }
    }
  }
}
</script>

<style lang="css" scoped>
.notes {
  margin-top: 0.5rem;
  margin-bottom: 4.5rem;
}
.collection .content .title {
  color: #222;
}
.collection .content time {
  color: #999;
  margin-bottom: 1rem;
  display: inline-block;
}
</style>
