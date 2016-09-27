<template>
  <div class="home">
    <div class="content">
      <h1>A·O</h1>
      <p>衡量价值的标准不是值不值钱,而是值不值得</p>
      <a v-link="{path: '/news'}">新闻</a>
      <a v-link="{path: '/note'}">笔记</a>
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
    margin-top: -200px;
    color: #fff;
  }
  .home {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #212121;
  }
  a {
    font-size: 14px;
    font-weight: 600px;
    display: inline-block;
    color: #fff;
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
</style>
