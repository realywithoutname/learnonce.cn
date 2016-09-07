<template>
  <div v-show="$root.needHead" class="header">
    <div class="container">
      <a v-link="{path: '/'}" class="logo">A·O</a>
      <a
        href="javascript:void(0)"
        @click="$root.dark = !$root.dark"
        class="view-switch" :class="{sun: !$root.dark, mood: $root.dark}"></a>
      <a
        v-show="$root.needNote"
        href="javascript:void(0)"
        @click="$root.noting = !$root.noting"
        class="editor-icon" :class="{note: !$root.noting, read: $root.noting}"></a>
      <a v-show="$root.needList"
        href="javascript:void(0)"
        @click="$root.list = !$root.list"
        class="list-icon" :class="{list: !$root.list, recard: $root.list}"></a>
    </div>
  </div>
</template>

<script>
export default {

  name: 'header',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>
