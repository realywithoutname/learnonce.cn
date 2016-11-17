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
    margin-top: -180px;
    color: rgba(255, 255, 255, 0.25);
  }
  .content h1 {
    font-family: cursive;
    color: #fff;
  }
  .home {
    position: fixed;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgb(198, 173, 213), rgba(222, 112, 6, 0.2), rgb(189, 105, 245));
  }
  a {
    font-weight: 600px;
    display: inline-block;
    height: 3rem;
    line-height: 3rem;
    padding: 0.5rem;
    font-size: 1.2rem;
    color: #586666;
  }
  h1 {
    font-size: 6rem;
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
