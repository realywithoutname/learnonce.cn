<template lang="html">
  <div :class="{'editor-container': $root.noting}" class="container">
    <section class="article">
      <article>
        <h1 v-html="note.title"></h1>
        <div class="marked-content" v-html="note.content | marked"></div>
      </article>
    </section>
    <section class="preview" id="editor">
      <div class="editor-title">
        <input placeholder="Entry Title" type="text" v-model="note.title" name="">
      </div>
      <textarea placeholder="Editer More" v-model="note.content"></textarea>
      <div class="editor-tool">
        <a class="pre" @click="$root.noting = false" href="javascrpt:void(0)">隐藏</a>
        <a class="save" @click="save" href="javascrpt:void(0)">&#10004保存</a>
      </div>
    </section>
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
  data: function () {
    return {
      note: {
        title: '',
        content: ''
      },
      preview: true
    }
  },
  computed: {},
  ready: function () {
    this.$root.noting = true
    this.$root.needNote = true
    if (this.$route.params.id === 'editor') {
      return
    } else {
      this.query()
    }
  },
  attached: function () {},
  methods: {
    save () {
      if (this.note._id) {
        this.update()
      } else {
        this.create()
      }
    },
    create () {
      this
        .Note
        .create(this.note)
        .then((res) => {
          console.log(res)
        })
    },
    update () {
      this
        .Note
        .updateById({id: this.note._id}, this.note)
        .then((res) => {
          console.log(res)
        })
    },
    query () {
      this
        .Note
        .findById({id: this.$route.params.id})
        .then((res) => {
          this.note = res.json()
        })
    }
  },
  filters: {
    marked: marked
  },
  components: {}
}
</script>

<style lang="css">
</style>
