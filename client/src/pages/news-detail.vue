<template lang="html">
  <div class="container">
    <div :class="{top: $refs.note.noting}" class="menu-bar zindex-4  xs-8 s-6 m-4 l-6 xl-4">
      <a v-link="{path: '/news'}"><i class="material-icons" @click="smallMenuShow = true">view_list</i></a>
      <a v-link="{path: '/'}"><i class="material-icons">home</i></a>
      <a v-if="!$refs.note.noting" @click="editor" class="hidden-med-down"><i class="material-icons" >border_color</i></a>
      <a><i class="material-icons" @click="toTop">vertical_align_top</i></a>
      <a :href="news.link"><i class="material-icons">send</i></a>
    </div>
    <div class="col news xs-8 s-6 m-4 l-6 xl-4" :class="{'s-left-1 m-left-2 l-left-3 xl-left-4': !$refs.note.noting, noting: $refs.note.noting}">
      <section v-show="!$refs.note.isPreview" class="card">
        <header>
          <h1 class="card-title">{{news.title}}</h1>
        </header>
        <div class="content" v-html="news.content">
        </div>
      </section>
      <section  v-show="$refs.note.isPreview" class="card">
        <header>
          <h1 class="card-title">{{$refs.note.note.title}}</h1>
        </header>
        <div class="content" v-html="$refs.note.note.content">
        </div>
      </section>
    </div>
    <note class="hidden-med-down xs-8 s-5 m-4 l-6" v-ref:note></note>
  </div>
</template>

<script>
import note from 'components/Note'
export default {
  data: function () {
    return {
      news: {}
    }
  },
  computed: {},
  ready: function () {
    this.getNews()
  },
  attached: function () {},
  methods: {
    getNews () {
      this.News.findById({id: this.$route.params.id}, {})
        .then((res) => {
          this.news = res.json()
        })
    },
    editor () {
      this.$refs.note.noting = !this.$refs.note.noting
    }
  },
  components: {note}
}
</script>

<style lang="css" scoped>
.card {
  background: #fff;
  margin-bottom: 4.5rem;
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
.menu-bar.top + .news {
  margin-top: 4rem;
}
.news.noting {
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
