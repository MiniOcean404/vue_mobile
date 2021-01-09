<template>
  <div class="nav-bar" :style="isBackgroundColor">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>
<script>
export default {
  name: 'NavBar',
  props: {
    backgroundColor: {
      type: String,
      default: '#fff'
    }
  },
  data() {
    return {
      isBackgroundColor: {
        backgroundColor: this.backgroundColor
      }
    }
  }
}
</script>
<style lang="scss">
.nav-bar {
  display: flex;
  height: 44px;
  line-height: 44px;
  box-shadow: 0px 1px 1px rgba($color: #000000, $alpha: 0.1);
  .left,
  .right {
    width: 64px;
  }
  .center {
    flex: 1;
    text-align: center;
  }
}
</style>
