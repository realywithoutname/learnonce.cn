<template>
  <div class="home" @click="showSth">
    <div class="content">
      <h1>so,so</h1>
      <p>衡量价值的标准不是值不值钱,而是值不值得</p>
      <a v-link="{path: '/news'}">新闻</a>
      <a v-link="{path: '/note'}">笔记</a>
    </div>
    <footer>
      <span v-show="keyShow">{{$root.key}}</span>
    </footer>
  </div>
</template>

<script>
export default {

  name: 'app-index',

  data () {
    return {
      keyShow: false,
      clickTime: new Date().getTime(),
      times: 1
    }
  },
  ready () {
    this.$root.needHead = false
  },
  methods: {
    showSth () {
      let time = new Date().getTime()

      if (time - this.clickTime > 900) {
        this.times = 1
      } else {
        this.times === 3 ? this.times = 1 : this.times ++
      }
      if (this.times === 1) {
        this.clickTime = new Date().getTime()
      }
      if (this.times === 3 && time - this.clickTime < 500) {
        this.times = 1
        this.keyShow = !this.keyShow
      }
    }
  },
  beforeDestroy () {
    this.$root.needHead = true
  }
}
</script>

<style lang="css" scoped>
  .content {
    text-align: center;
    position: relative;
    top: 50%;
    margin-top: -200px;
    color: #212121;
  }
  .content h1 {
    font-family: cursive;
  }
  .home {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #fff;
  }
  a {
    font-size: 14px;
    font-weight: 600px;
    display: inline-block;
    /*color: #fff;*/
    height: 3rem;
    line-height: 3rem;
    padding: 0.5rem;
    font-size: 1.2rem;
  }
  h1 {
    font-size: 5rem;
    padding: 0;
    margin: 1rem;
  }
  footer {
    color: #fff;
    position: absolute;
    width: 100%;
    bottom: 2rem;
    text-align: center;
    font-size: 1.3rem;
    font-weight: bold;
  }
</style>
