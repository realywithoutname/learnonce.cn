<template>
  <div class="container">
    <div :class="{top: $refs.note.noting}" class="menu-bar zindex-4  xs-8 s-6 m-4 l-6 xl-4">
      <a v-link="{path: '/note'}"><i class="material-icons" @click="smallMenuShow = true">view_list</i></a>
      <a v-link="{path: '/'}"><i class="material-icons">home</i></a>
      <a @click="editor" v-show="!$refs.note.noting" class="hidden-med-down"><i class="material-icons">border_color</i></a>
      <a><i class="material-icons" @click="toTop">vertical_align_top</i></a>
    </div>
    <div class="col note xs-8 s-6 m-4 l-6 xl-4" :class="{'s-left-1 m-left-2 l-left-3 xl-left-4': !$refs.note.noting, noting: $refs.note.noting}">
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
      </section>
    </div>
    <note class="hidden-med-down xs-8 s-5 m-4 l-6" v-ref:note></note>
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
          this.$refs.note.note = this.note = res.json()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    editor () {
      // this.$refs.note.note = Object.assign({}, this.note)
      this.$refs.note.isPreview = true
      this.$refs.note.noting = true
    }
  },
  filters: {
    marked: marked
  },
  components: {note}
}
</script>

<style lang="css" scoped>
.card {
  background: #fff;
  margin-bottom: 5rem;
}
.menu-bar {
  transform: translate(-50%);
  left: 50%;
  margin-left: 0rem;
}
.menu-bar.top {
  left: 0.5rem;
  margin: 0;
  transform: none;
}
.menu-bar.top + .note {
  margin-top: 4rem;
}
.note.noting {
  margin-left: 0.5rem;
}
@media (max-width: 600px) {
  .menu-bar {
    transform: none;
    left: auto;
    margin-left: 0.5rem;
  }
}
</style>
