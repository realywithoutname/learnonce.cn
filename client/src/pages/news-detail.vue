<template>
  <div :class="{'editor-container': $root.noting}" class="container">
    <section class="article">
      <article v-if="preview">
        <div class="marked-content" v-html="note.content | marked"></div>
      </article>
      <article v-show="!preview">
        <h1 v-html="news.title"></h1>
        <div v-html="news.content"></div>
        <div class="read-source">
          <a :href="news.link">阅读原文</a>
        </div>
      </article>
    </section>
    <section :class="{preview: preview}" id="editor">
      <div class="editor-title">
        <input placeholder="Entry Title" type="text" v-model="note.title" name="">
      </div>
      <textarea placeholder="Editer More" v-model="note.content"></textarea>
      <div class="editor-tool">
        <a class="pre" @click="preview = !preview" href="javascrpt:void(0)">预览</a>
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
  name: 'news-detail',
  data () {
    return {
      news: {},
      preview: false,
      note: {
        title: '',
        content: ''
      }
    }
  },
  ready () {
    this.$root.needNote = true
    this.query()
  },
  methods: {
    query () {
      let id = this.$route.params.id
      this
        .News
        .findById({id})
        .then((res) => {
          this.news = res.json()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    save () {
      // TODO::
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
