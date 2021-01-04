<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="isActive"><slot name="icon-img-active"></slot></div>
    <div v-else><slot name="icon-img"></slot></div>
    <div :style="isActiveStyle"><slot name="icon-text"></slot></div>
  </div>
</template>
<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    fontColor: {
      type: String,
      default: '#ff5777'
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) != -1
    },
    isActiveStyle() {
      return this.isActive ? { color: this.fontColor } : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.push(this.path)
    }
  }
}
</script>
<style lang="scss" scoped>
.tab-bar-item {
  flex: 1;
  height: 49px;
  text-align: center;
  font-size: 14px;
  img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    margin-bottom: 2px;
    vertical-align: middle;
  }
}
</style>
