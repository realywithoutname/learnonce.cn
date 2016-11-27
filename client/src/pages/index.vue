<template>
  <div class="home">
    <div class="content">
      <img class="logo" src="/static/image/logo.png" alt="" />
    </div>
    <div class="main">
      <ul>
        <li>
          <a v-link="{path: '/news'}" class="flat-btn">资讯</a>
        </li>
        <li>
          <a v-link="{path: '/note'}" class="flat-btn">笔记</a>
        </li>
      </ul>
    </div>
    <b v-text="$root.key"></b>
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
    background: linear-gradient(170deg, #3f51b5 0%, #3f51b5 45%, #888 45%, #888 100%);
  }
  .logo {
    display: block;
    position: relative;
    height: 15rem;
    width: 15rem;
    margin: 0 auto;
  }
  .content {
    text-align: center;
    position: relative;
    top: 50%;
    height: 15rem;
    transform: translateY(-100%);
    color: rgba(255, 255, 255, 0.25);
  }
  .main {
    position: absolute;
    top: 50%;
    width: 100%;
    color: #fff;
    font-size: 1.2rem;
    text-align: center;
  }
  .main li {
    margin-top: 1rem;
  }
  .main .flat-btn {
    color: #fff;
    padding: 1rem 1.5rem;
    box-shadow: 0 1px #fff;
  }
  .home b {
    color: #fff;
    position: fixed;
    width: 100%;
    text-align: center;
    bottom: 2rem;
  }
  .main ul {
    margin-top: 0.5rem;
  }
  .main ul li {
    display: inline-block;
    padding: 0.5rem;
  }
  @media (max-width: 600px) {
    .content {
      transform: scale(0.8) translateY(-120%);
    }
    .main ul li {
      margin-top: 1rem;
      display: block;
    }
  }

</style>
