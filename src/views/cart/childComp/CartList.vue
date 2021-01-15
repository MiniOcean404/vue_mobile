<template>
  <div class="cart-list">
    <Scroll class="scroll-size" ref="scroll" :probeType="3" :pullUpLoad="true">
      <CartListItem
        v-for="(item, index) in cartList"
        :key="index"
        :item-info="item"
      >
      </CartListItem>
    </Scroll>
  </div>
</template>

<script>
// 导入子组件
import CartListItem from './CartListItem'

// 导入vuex中的getters
import { mapGetters } from 'vuex'

// 导入scroll滚动
import Scroll from 'components/common/scroll/Scroll'

export default {
  name: 'CartList',
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.refresh()
  },
  methods: {
    refresh() {
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style lang="scss">
.cart-list {
  height: calc(100% - 44px - 49px - 40px);

  .scroll-size {
    height: 100%;
    overflow: hidden;
  }
}
</style>
