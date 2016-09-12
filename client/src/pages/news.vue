<template>
  <div class="content container">
    <div v-for="item in itemIist" track-by="_id" :class="{'mood-card': mood}" class="card">
      <h2 v-html="item.title" class="card-title"></h2>
      <div  v-if="item.image" class="card-image">
        <img @error="imgError($event)" :src="item.image">
      </div>
      <div class="card-content">
        <p v-html="item.description.substr(0, 150).concat('...')"></p>
      </div>
      <h4 class="card-footer">
        <span>来自：{{item.from}} {{item.pubTime | date 'YYYY/MM/dd HH:mm'}}</span>
        <a href="javascript:void(0)" @click="readMore(item)">阅读全文</a>
      </h4>
    </div>
    <div class="need-more">
      <a href="javescript:void(0)" class="waves-effect" @click="loadMore"></a>
    </div>
  </div>
</template>

<script>
export default {

  name: 'news',

  data () {
    return {
      itemIist: [],
      mood: false,
      timestamp: new Date().getTime(),
      filter: {
        where: {},
        limit: 20,
        offset: 0,
        filds: ['id', 'title', 'description', 'from', 'createTime', 'image'],
        sort: {createTime: 'desc'}
      }
    }
  },
  ready () {
    this.query()
    this.$root.needList = true
  },
  methods: {
    query () {
      this
        .News
        .find({filter: this.filter})
        .then((res) => {
          this.itemIist.push(...res.json())
          if (this.itemIist.length === 0) {
            return
          }
          this.timestamp = new Date(this.itemIist[this.itemIist.length - 1].createTime).getTime()
        })
    },
    loadMore () {
      this.filter.offset = this.filter.offset + this.filter.limit
      this.query()
    },
    imgError (e) {
      e.target.src = 'http://e.hiphotos.baidu.com/zhidao/wh%3D600%2C800/sign=bdd0bc965882b2b7a7ca31c2019de7d7/622762d0f703918fbc781958503d269758eec4f2.jpg'
    },
    readMore (news) {
      this.$router.go({path: `/news/${news._id}`})
    }
  }
}
</script>

<style lang="css" scoped>
  .container {
    padding-top: 10px;
    background: rgb(239, 240, 241);;
  }
  .dark .container {
    background-color: rgb(65, 65, 65);
    color: #fff;
  }

</style>
