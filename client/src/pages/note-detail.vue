<template>
  <div class="container">
    <div class="col xs-8 s-6 m-4 l-4 s-left-1 m-left-2 l-left-4">
      <div class="nav-bar-equal margin-bottom"></div>
      <section class="card">
        <header>
          <h1 class="card-title">{{note.title}}</h1>
        </header>
        <div class="content">
          <p>
            {{note.description}}
          </p>
          <div class="" v-html="note.content || '' | marked">

          </div>
        </div>
        <footer v-show="$root.level" class="card-action">
          <button @click="editorNote" type="button" name="button">编辑文章</button>
        </footer>
      </section>
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
  name: 'note-detail',
  data () {
    return {
      note: {}
    }
  },
  ready () {
    this.query()
  },
  methods: {
    query () {
      let id = this.$route.params.id
      this
        .Note
        .findById({id})
        .then((res) => {
          this.note = res.json()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    editorNote () {
      window.localStorage.EDITORNOTE = JSON.stringify(this.note)
      this.$router.go({path: '/note/' + this.note._id + '/editor'})
    }
  },
  filters: {
    marked: marked
  },
  beforeDestroy () {
    this.$root.needNote = false
  }
}
</script>

<style lang="css" scoped>

</style>
