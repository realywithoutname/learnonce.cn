<template>
  <div :class="{dark: !light, en: $root.level}" class="container">
    <header class="nav-bar xs-8">
      <a class="home-icon" v-link="{path: '/'}"><i class="material-icons">home</i></a>
      <a v-if="$root.level" class="edit-icon" v-link="{path: '/note/create'}">
        <i class="material-icons">border_color</i>
      </a>
    </header>
    <header class="notes-header zindex-4">
      <div class="logo">
        <img class="" src="/static/image/logo.png" alt="" />
      </div>
      <a class="tags-switch-icon zindex-2" @click="smallMenuShow = !smallMenuShow">
        <i class="material-icons">{{smallMenuShow ? 'close' : 'apps'}}</i>
      </a>
    </header>
    <div class="menu-bar">
      <a v-link="{path: '/'}"><i class="material-icons">home</i></a>
      <a v-show="$root.level" v-link="{path: '/note/create'}"><i class="material-icons">border_color</i></a>
      <a><i class="material-icons" @click="toTop">vertical_align_top</i></a>
      <a @click="light = !light"><i class="material-icons">{{light ? 'brightness_2' : 'wb_sunny'}}</i></a>
    </div>
    <div class="notes xs-8">
      <ul :style="{display: smallMenuShow ? 'flex' : 'none'}" class="note-tags lager-show">
        <li @click="activeTag = null" :class="{active: !activeTag}">
          <label for="">全部</label>
          <b>{{tags.total || 0}}</b>
        </li>
        <li @click="activeTag = tag.name" v-for="tag in tags" :class="{active: tag.name === activeTag}">
          <label for="">{{tag.name}}</label>
          <b>{{tag.count}}</b>
        </li>
      </ul>
      <ul class="collections">
          <li v-for="note in notes" class="collection divider">
            <a v-link="{path: '/note/' + note._id}">
              <div class="content">
                <h2 class="title">{{note.title}}</h2>
                <time>{{note.createTime | date 'YYYY MM/DD'}}</time>
                <p v-text="note.description"></p>
              </div>
            </a>
            <h3 v-show="note.tags" class="note-tag">
              <i class="material-icons">label_outline</i>
              <span>{{note.tags}}</span>
            </h3>
            <div class="hidden-small-down clear">
              <i @click="distroy(note)" class="material-icons">clear</i>
            </div>
          </li>
        </ul>
      <div v-show="!noData" @click="loadMore" class="col xs-8 load-more">
        <i class="material-icons">expand_more</i>
      </div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import hljs from 'highlight.js'
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
      smallMenuShow: false,
      activeTag: null,
      light: true
    }
  },
  ready () {
    this.query()
    this.getTags()
    // this.$root.sideCtrl = true
    this.$root.needNote = true
  },
  watch: {
    activeTag (name) {
      this.smallMenuShow = false
      if (!name) {
        this.notes = []
        this.filter.offset = 0
        this.filter.where = {}
        this.query()
        return
      }
      this.getNewsByTagName(name)
    }
  },
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
          this.notes.push(...notes)
        })
    },
    loadMore () {
      this.filter.offset = this.notes.length
      this.query()
    },
    getNewsByTagName (name) {
      this.filter.offset = 0
      this.filter.where = {$like: {tags: name}}
      this.notes = []
      this.query()
    },
    getTags () {
      this.Tag.find({filter: {fields: ['id', 'name', 'count']}})
        .then((res) => {
          this.tags = res.json()
        })
    },
    distroy (note) {
      this.Note.deleteById({id: note._id})
        .then((res) => {
          this.notes = this.notes.filter((item) => {
            return item._id !== note._id
          })
          this.getTags()
        })
    }
  },
  filters: {
    marked: marked
  }
}
</script>

<style lang="css" scoped>
.notes-header {
  text-align: center;
  margin-top: 0;
  padding: 2rem;
  background: #3f51b5;
  box-sizing: border-box;
}
.home-icon, .edit-icon, .tags-switch-icon {
  display: none;
}
.notes-header .logo {
  height: 9rem;
  width: 9rem;
  border-radius: 100%;
  margin: 0 auto;
}
.notes-header .logo img {
  width: 6rem;
  margin-top: 1.5rem;
}
.notes .collections {
  background: #fafafa;
  padding: 0;
}
.en .notes .collection:hover .clear {
  display: block;
  position: absolute;
  width: 10rem;
  height: 100%;
  top: 0;
  right: 0;
  background: rgba(153,153,153,0.8);
  /*text-align: center;*/
}
.en .notes .collection:hover .clear i {
  font-size: 2rem;
  width: 4rem;
  height: 4rem;
  background: #fff;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 100%;
  color: red;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -2rem;
  margin-top: -2rem;
  cursor: default;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);
}
.notes .collection .clear {
  display: none;
}
.notes .collection .title {
  color: #4d4d4d;
  font-size: 1.5rem;
}
.collections .collection {
  padding: 2rem 1rem;
  position: relative;
}
.collections .collection:hover {
  background: rgba(0, 0, 0, 0);
}
.collection .content *{
  color: #c7c7c7;
}
.collection .content time {
  position: absolute;
  right: 3rem;
  top: 2rem;
}
.divider {
  box-shadow: none;
  border-bottom: solid 0.1rem rgba(47,47,47, 0.1);
}
ul.note-tags {
  z-index: 1;
  max-height: 12rem;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  background: #2f2f2f;
  align-content: flex-start;
}
.notes ul.note-tags li {
  flex: 0 0 auto;
  width: 6rem;
  height: 6rem;
  text-align: center;
  position: relative;
  box-sizing: border-box;
}
.notes ul.note-tags li.active {
  background: rgba(153, 153, 153, 0.1) !important;
}
ul.note-tags li.active b, ul.note-tags li.active label {
  color: #2f2f2f !important;
}
.notes ul.note-tags li:first-child {
  background: #3f51b5;
}
.notes ul.note-tags li:nth-of-type(5n + 2):not(:first-child) {
  background: #e51c23;
}
.notes ul.note-tags li:nth-of-type(5n + 1) {
  background: #673ab7;
}
.notes ul.note-tags li:nth-of-type(5n + 5) {
  background: #9c27b0;
}
.notes ul.note-tags li:nth-of-type(5n + 3) {
  background: #5677fc;
}
.notes ul.note-tags li:nth-of-type(5n + 4) {
  background: #009688;
}
.notes ul.note-tags li label,.notes ul.note-tags li b {
  color: #fff;
  display: block;
  font-size: 1rem;
  height: 3rem;
  line-height: 3rem;
}
.notes ul.note-tags li label {
  background: rgba(255, 255, 255, 0.2);
}
.note-tag {
  font-size: 1rem;
  height: 1.5rem;
  line-height: 1.5rem;
  color: #9a9a9a;
  padding: 0.5rem 1rem;
}
.note-tag i {
  color: #ff9800;
}
.note-tag span {
  display: inline-block;
  position: absolute;
  margin-left: 0.5rem;
  font-weight: 200;
}
@media (min-width: 800px) {
  .nav-bar {
    display: none;
  }
  .notes {
    width: 42rem;
    margin: 0 auto;
    clear: both;
    margin-bottom: 3rem;
  }
  .lager-show {
    display: flex !important;
  }
  .notes ul.note-tags {
    margin: 2rem 0;
  }
  .notes ul.note-tags li:hover {
    background: rgba(153, 153, 153, 0.2) !important;
  }
  .notes-header {
    box-shadow: none;
  }
  .menu-bar {
    display: flex;
    flex-flow: column;
    right: 1rem;
    bottom: 12rem;
    background: transparent;
    box-shadow: none;
  }
  .menu-bar a:hover {
    background: rgba(153, 153, 153, 0.3);
  }
  .menu-bar a {
    flex: 1;
    text-align: center;
    line-height: 3rem;
    color: #fff;
    width: 3rem;
    height: 3rem;
    margin-bottom: 0.5rem;
  }
  .dark.container {
    background: #2f2f2f;
  }
  .dark .notes-header {
    margin-top: 4rem;
    background: #2f2f2f;
  }
  .dark .notes-header .logo {
    background: -webkit-radial-gradient(rgba(255, 255, 255, 0.58), rgba(209, 190, 175, 0.68));
  }
  .dark .collections {
    background: #3c3c3c;
  }
  .dark .collections .content *{
    color: #c7c7c7;
  }
}
@media (max-width: 800px) {
  .menu-bar, ul.note-tags {
    display: none;
  }
  .notes-header {
    background: #3f51b5;
    position: fixed;
    width: 100%;
    z-index: 7;
    top: 0;
  }
  .nav-bar {
    box-shadow: none;
  }
  .notes-header .logo {
    background: transparent;
    padding-top: 1rem;
    box-sizing: border-box;
  }
  .home-icon, .edit-icon, .tags-switch-icon {
    color: #fff;
    font-size: 2rem;
    display: inline-block;
    z-index: 1000;
  }
  .home-icon {
    top: 0;
    left: 1rem;
  }
  .edit-icon {
    top: 0;
    right: 1rem;
  }
  .tags-switch-icon {
    background: #ff4081;
    padding: 0.5rem;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 100%;
    right: 1rem;
    position: absolute;
  }
  .tags-switch-icon i {
    margin-top: 0.2rem;
  }
  .tags-switch-icon:after {
    position: absolute;
    padding: 0.5rem;
    width: 2.5rem;
    height: 2.5rem;
    content: '';
    top: 0;
    left: 0;
    border-radius: 100%;
    box-shadow: 0 2px 4px 2px rgba(0,0,0,0.2);
  }
  .note-tags {
    position: fixed;
    width: 100%;
    top: 13rem;
    background: #2f2f2f;
  }
  .notes .collections {
    background: #fafafa;
    margin-top: 13rem;
  }
  .notes .collection .title {
    color: #4d4d4d;
  }
  .notes ul.note-tags li {
    width: 25%;
  }
}
.load-more {
  background: #fafafa;
}
</style>
