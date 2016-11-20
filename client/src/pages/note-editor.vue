<template lang="html">
  <div class="container">
    <div :class="{'top hidden-small-down': $refs.note.noting}" class="menu-bar zindex-4  xs-8 s-6 m-4 l-6 xl-4">
      <a @click="goback"><i class="material-icons" @click="smallMenuShow = true">arrow_back</i></a>
      <a v-link="{path: '/'}"><i class="material-icons">home</i></a>
      <a @click="editor"><i class="material-icons">border_color</i></a>
      <a><i class="material-icons" @click="toTop">vertical_align_top</i></a>
    </div>
    <div class="col note xs-8 s-6 m-4 l-6 xl-4" :class="{'s-left-1 m-left-2 l-left-3 xl-left-4': !$refs.note.noting, 'noting hidden-small-down': $refs.note.noting}">
      <section class="card">
        <header>
          <h1 class="card-title">{{note.title || 'input something'}}</h1>
        </header>
        <div class="content wiki-body">
          <p>
            {{note.description}}
          </p>
          <div class="markdown-body" v-html="note.content || '' | marked"></div>
        </div>
      </section>
    </div>
    <note class="xs-8 s-5 m-4 l-6" v-ref:note></note>
  </div>
</template>

<script>
import marked from 'marked'
import hljs from 'highlight.js'
import note from 'components/Note'
import './../assets/style/markdown.css'
marked.setOptions({
  highlight: function (code, lang) {
    return hljs.highlightAuto(code, [lang]).value
  }
})
export default {
  data: function () {
    return {
      note: {}
    }
  },
  computed: {},
  ready: function () {
    this.$refs.note.isPreview = true
    this.$refs.note.noting = true
    this.note = this.$refs.note.note
  },
  attached: function () {},
  methods: {
    query () {
      this
        .Note
        .findById({id: this.$route.params.id})
        .then((res) => {
          this.$refs.note.note = res.json()
        })
    },
    editor () {
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
  .note.noting {
    margin-left: 0;
  }
}
</style>
