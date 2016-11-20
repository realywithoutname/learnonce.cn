<template>
  <div class="home">
    <div class="content">
      <span class="logo"></span>
    </div>
    <div class="main">
      <b v-text="$root.key"></b>
      <ul>
        <li>
          <a v-link="{path: '/news'}" class="flat-btn">资讯</a>
        </li>
        <li>
          <a v-link="{path: '/note'}" class="flat-btn">笔记</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

  name: 'app-index',

  data () {
    return {
    }
  }
}
</script>

<style lang="css" scoped>
  .home {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
  }
  .content {
    text-align: center;
    position: relative;
    top: 50%;
    height: 144px;
    transform: translateY(-100%);
    color: rgba(255, 255, 255, 0.25);
  }
  @media (max-width: 1024px) {
    .content {
      transform: scale(0.5) translateY(-150%);
    }
  }
  .main {
    position: absolute;
    top: 50%;
    width: 100%;
    color: #fff;
    font-size: 1.2rem;
    text-align: center;
  }

  .main .flat-btn {
    border: 1px solid #fff;
    color: #fff;
    padding: 0.3rem 1.5rem;
    margin-top: 1rem;
  }
  .main ul {
    margin-top: 0.5rem;
  }
  .main ul li {
    display: inline-block;
    padding: 0.5rem;
  }

</style>
