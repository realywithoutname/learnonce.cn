<template>
  <div class="container">
    <section v-for="note in notes" track-by="_id" class="card">
      <h2 class="card-title">
        <b class="time">{{note.createTime | date 'YYYY/MM/DD'}}</b>
        <b class="title">{{note.title}}</b>
        <b @click="findOne(note._id, $index)" class="view">{{note.read ? '收起' : '阅读'}}</b>
      </h2>
      <div v-show="note.read" v-html="note.content | marked" class="card-content">
      </div>
      <div class="card-footer read-source" v-show="note.read">
        <a v-link="{path: '/notes/' + note._id}">阅读原文</a>
      </div>
    </section>
    <div class="need-more">
      <a href="javescript:void(0)" :class="{'no-data': noData}" class="waves-effect" @click="loadMore"></a>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import hljs from 'highlight.js'
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
        filds: ['title', 'createTime']
      },
      notes: [],
      noData: false
    }
  },
  ready () {
    this.query()
    this.$root.needNote = true
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
          this.notes = notes
        })
    },
    loadMore () {
      this.filter.offset = this.notes.length
      this.query()
    },
    findOne (id, index) {
      if (this.notes[index].read) {
        this.notes[index].read = false
        return
      } else if (this.notes[index].content) {
        this.notes[index].read = true
        return
      }
      this
        .Note
        .findById({id: id})
        .then((res) => {
          this.notes[index].content = res.json().content
          this.notes[index].read = true
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
.container {
  padding-top: 10px;
  background: #eee;
}
.dark .container {
  background-color: rgb(65, 65, 65);
  color: #fff;
}

.title {
  padding: 0 15px;
}
.time {
  color: #ddd;
}
.view {
  float:right;
  font-size: 1.3rem;
  cursor: pointer;
}
</style>
