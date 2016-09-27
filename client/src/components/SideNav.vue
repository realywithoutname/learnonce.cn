<template lang="html">
  <div v-show="show" :class="{
    'left-nav': float === 'left',
    'right-nav': float === 'right'
  }" class="side-nav xs-8">
    <header class="zindex-4">
      <b>{{title}}</b>
      <a class="right" @click="closeSideNav">
        <i class="material-icons">close</i>
      </a>
      <a v-show="$root.noting" class="right blue-5">
        <i class="material-icons">border_color</i>
      </a>
    </header>
    <section class="xs-8 body">
      <slot></slot>
    </section>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false,
      twoWay: true
    },
    float: {
      type: String,
      default: 'right'
    },
    title: {
      type: String
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {
    closeSideNav () {
      this.show = false
      this.$root.noting = false
    }
  },
  components: {}
}
</script>

<style lang="css" scoped>
.left-nav {
  left: 0;
}
.right-nav {
  right: 0;
}
</style>
