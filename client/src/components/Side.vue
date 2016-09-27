<template lang="html">
  <nav :class="{menu: $root.menu}" class="side-bar col l-2 m-2 s-2 hidden-small-down">
    <div @click="$root.menu = false" class="scrim col xs-8 hidden-small-up"></div>
    <div class="side col xs-8">
      <slot name="header"></slot>
      <slot name="body"></slot>
    </div>
  </nav>
</template>

<script>
export default {
  data: function () {
    return {
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {},
  components: {}
}
</script>

<style lang="css">
</style>
