<template>
  <div class="tab-contrlo">
    <div
      v-for="(item, index) in title"
      :key="index"
      class="tab-contrlo-item"
      :class="{ active: currentIndex == index }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    title: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style lang="scss">
.tab-contrlo {
  display: flex;
  text-align: center;
  height: 44px;
  line-height: 44px;
  font-size: 15px;
  background-color: #fff;
  .tab-contrlo-item {
    flex: 1;
  }
  .active {
    color: $color-tint;
    span {
      padding: 0 5px 5px;
      border-bottom: 3px solid $color-tint;
    }
  }
}
</style>
