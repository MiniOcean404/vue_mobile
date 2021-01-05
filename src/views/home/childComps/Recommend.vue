<template>
  <div class="recommend">
    <div
      class="recommend-item"
      v-for="(item, index) in recommends"
      :key="index"
    >
      <a :href="item.link">
        <img :src="item.image" alt="" />
      </a>
      <div class="font">{{ item.title }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Recommend',
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
<style lang="scss">
.recommend {
  display: flex;
  text-align: center;
  padding: 10px 0;
  border-bottom: 8px solid #eee;
  .recommend-item {
    flex: 1;
    img {
      width: 80px;
      height: 80px;
    }
    .font {
      font-size: 14px;
    }
  }
}
</style>
