<template>
  <div class="container">
    <header class="nav-bar need-app xs-8">
      <a class="back-icon" @click="goback">
        <i class="material-icons">navigate_before</i>
      </a>
      <div class="logo">
        <img class="" src="/static/image/logo.png" alt="" />
      </div>
      <a class="edit-icon" v-link="{path: '/'}"><i class="material-icons">home</i></a>
    </header>
    <div class="col xs-8 s-6 m-4 l-6 xl-4  x-center node-editor">
      <note v-ref:note></note>
    </div>
  </div>
</template>

<script>
import note from 'components/Note'
export default {
  name: 'note-detail',
  data () {
    return {
      note: {},
      noting: true
    }
  },
  components: {note}
}
</script>

<style lang="css" scoped>
.node-editor {
  position: relative;
  background: #fafafa;
  padding: 1rem;
  margin-top: 5rem;
}

@media (max-width: 600px) {
  .node-editor {
    margin-top: 4rem;
  }
}
</style>
