<template lang="html">
  <div class="container">
    <div slot="header" class="nav-bar-equal"></div>
    <note :editor-note="note" v-ref:note>
    </note>
  </div>
</template>

<script>
import marked from 'marked'
import hljs from 'highlight.js'
import note from 'components/Note'
import './../assets/style/github.min.css'
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
    this.$root.noting = true
    this.$root.noteCtrl = false
    this.$refs.note.isPreview = true
    let note = window.localStorage.EDITORNOTE
    if (this.$route.params.id && note) {
      this.$refs.note.note = JSON.parse(note)
    } else if (this.$route.params.id) {
      this.query()
    }
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
    }
  },
  filters: {
    marked: marked
  },
  beforeDestroy () {
    this.$root.noteCtrl = true
  },
  components: {note}
}
</script>

<style lang="css">
</style>
