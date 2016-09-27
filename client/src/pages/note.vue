<template>
  <div class="container">
    <side>
      <div slot="header" class="nav-bar-equal">
        <a href="#" class="brand  indigo-5">A·O</a>
        <span class="hidden-small-and-up">if you know, please more</span>
      </div>
      <ul slot="body" class="collections par-bg divider">
        <li>
          <h3>Tags</h3>
        </li>
        <li class="tag" v-for="tag in tags">
          <span>{{tag.name}}{{tag.count}}</span>
        </li>
      </ul>
    </side>
    <div class="col l-left-2 m-left-2 s-left-3 l-10 m-6 s-4 xs-8">
      <div class="nav-bar-equal margin-bottom"></div>
      <div class="col xs-8 m-6 l-6 m-left-1 l-left-3">
        <ul class="collections  zindex-2">
          <li v-for="note in notes" class="collection divider">
            <a v-link="{path: '/note/' + note._id}" target="_blank">
              <div class="content">
                <span class="title">{{note.title}}</span>
                <p>
                  {{note.createTime | date 'YYYY-MM-DD'}}
                  <br>
                  {{note.description}}
                  <p v-if="note.tags">
                    <b class="tag" v-for="tag in note.tags.split(',')">{{tag}}</b>
                  </p>
                </p>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import hljs from 'highlight.js'
import side from 'components/Side'
import './../assets/style/github.min.css'
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
      noData: false
    }
  },
  ready () {
    this.query()
    this.getTags()
    // this.$root.sideCtrl = true
    this.$root.needNote = true
  },
  components: {side},
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
    }
  }
}
</script>

<style lang="css" scoped>

</style>
