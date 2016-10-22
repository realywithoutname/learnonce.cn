<template lang="html">
  <div class="container">
    <div class="col xs-8 s-6 m-4 l-4 s-left-1 m-left-2 l-left-4">
      <div class="nav-bar-equal margin-bottom"></div>
      <section class="card">
        <header>
          <h1 class="card-title">{{news.title}}</h1>
        </header>
        <div class="content" v-html="news.content">
        </div>
      </section>
    </div>
  </div>
</template>

<script>
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
    }
  },
  components: {}
}
</script>

<style lang="css">
</style>
