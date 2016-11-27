<template>
  <div class="container">
    <header class="nav-bar xs-8">
      <a class="back-icon" @click="goback">
        <i class="material-icons">navigate_before</i>
      </a>
      <div class="logo">
        <img class="" src="/static/image/logo.png" alt="" />
      </div>
      <a v-link="{path: '/note/create'}" v-if="$root.level" class="edit-icon"><i class="material-icons">border_color</i></a>
    </header>
    <div class="menu-bar">
      <a v-link="{path: '/'}"><i class="material-icons">home</i></a>
      <a v-if="$root.level" @click="editor"><i class="material-icons">mode_edit</i></a>
      <a><i class="material-icons" @click="toTop">vertical_align_top</i></a>
    </div>
    <div class="note note-detail xs-8 s-6 m-4 l-6 xl-4 x-center">
      <section class="card">
        <header>
          <h1 class="card-title">{{note.title}}</h1>
        </header>
        <div class="content wiki-body">
          <p>
            {{note.description}}
          </p>
          <div class="markdown-body" v-html="note.content || '' | marked"></div>
        </div>
        <footer class="card-action">
          <button type="button" name="button">
            <i class="material-icons">navigate_before</i>
          </button>
          <button type="button" name="button">
            <i class="material-icons">navigate_next</i>
          </button>
        </footer>
      </section>
    </div>
    <div class="xs-8 note-editor">
      <modal class="body-sroll" :show.sync="noting" :title="'文章编辑'">
        <note v-ref:note></note>
        <footer slot="footer"></footer>
      </modal>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import hljs from 'highlight.js'
import './../assets/style/markdown.css'
import note from 'components/Note'
marked.setOptions({
  highlight: function (code, lang) {
    return hljs.highlightAuto(code, [lang]).value
  }
})
export default {
  name: 'note-detail',
  data () {
    return {
      note: {},
      noting: false
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
          this.$refs.note.note = this.note = res.json()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    editor () {
      this.noting = true
    }
  },
  filters: {
    marked: marked
  },
  components: {note}
}
</script>

<style lang="css" scoped>
.card, .card:hover {
  background: #fafafa;
  margin-bottom: 1rem;
  box-shadow: none;
  margin-top: 5rem;
}
.menu-bar {
  bottom: 8rem;
}
@media (max-width: 600px) {
  .card, .card:hover {
    margin-top: 4rem;
  }
}
</style>
