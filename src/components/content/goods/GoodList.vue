<template>
  <div class="goods">
    <GoodListItem
      v-for="(item, index) in goods"
      :key="index"
      :goodsItem="item"
    ></GoodListItem>
  </div>
</template>

<script>
import GoodListItem from './GoodListItem'

export default {
  name: 'GoodList',
  components: {
    GoodListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scope>
.goods {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}
</style>
