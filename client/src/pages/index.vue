<template>
  <div class="home">
    <div class="content">
      <h1>A·O</h1>
      <p>衡量价值的标准不是值不值钱,而是值不值得</p>
      <a v-link="{path: '/news'}">新闻</a>
      <a v-link="{path: '/notes'}">笔记</a>
    </div>
  </div>
</template>

<script>
export default {

  name: 'app-index',

  data () {
    return {

    }
  },
  ready () {
    this.$root.needHead = false
  },
  beforeDestroy () {
    this.$root.needHead = true
  }
}
</script>

<style lang="css" scoped>
  .content {
    text-align: center;
    font-family: cursive;
    position: relative;
    top: 50%;
    margin-top: -100px;
    color: #b098c7;
  }
  .home {
    background: #fff;
    position: fixed;
    width: 100%;
    height: 100%;
  }
  a {
    font-size: 14px;
    font-weight: 600px;
    display: inline-block;
    width: 45px;
    color: #b098c7 !important;
  }
  h1 {
    font-size: 64px;
  }
</style>
