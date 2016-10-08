<template>
  <div v-show="$root.needHead" class="nav-bar col xs-8">
    <div class="col xs-2 s-2 m-2 l-2 hidden-small-down">
      <a v-link="{path: '/'}" class="brand">A·O</a>
    </div>
    <div class="col" :class="{'xs-8 s-6 l-9': search}">
      <a v-show="$root.sideCtrl" @click="$root.menu = true" class="hidden-small-and-up wave-effect">
        <i class="material-icons">menu</i>
      </a>
      <a href="#" class="hidden-small-and-up wave-effect">
        <i class="material-icons">home</i>
      </a>
      <a :class="{search: search}" class="search-icon wave-effect">
        <i @click="search = true" v-show="!search" class="material-icons">search</i>
        <i v-show="search" class="material-icons"></i>
        <span v-show="search">
          <input type="text" v-model="keyword" name="name" value="">
          <i @click="closeSearch" class="material-icons">close</i>
        </span>
      </a>
    </div>
    <div v-show="!search" class="right m-right-1 l-right-1">
      <a v-show="$root.noteCtrl && $root.level" class="wave-effect" v-link="{path: '/note/create'}">
        <i class="material-icons">border_color</i>
      </a>
      <!-- <a class="wave-effect" @click="$root.filterCtrl = true">
        <i class="material-icons">filter_list</i>
      </a> -->
    </div>
  </div>
</template>

<script>
export default {

  name: 'header',

  data () {
    return {
      search: false,
      keyword: ''
    }
  },
  methods: {
    closeSearch () {
      this.keyword = ''
      this.search = false
    }
  }
}
</script>

<style lang="css" scoped>
.editor-icon {
  color: #fff;
}
</style>
