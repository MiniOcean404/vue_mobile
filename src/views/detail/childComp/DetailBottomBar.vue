<template>
  <div class="bottom-bar">
    <div class="item left">
      <div class="icon service">
        <span>客服</span>
      </div>
      <div class="icon shop">
        <span>店铺</span>
      </div>
      <div class="icon select">
        <span>收藏</span>
      </div>
    </div>
    <div class="item right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBottomBar',
  data() {
    return {}
  },
  methods: {
    addToCart() {
      this.$emit('addToCart')
    }
  }
}
</script>

<style lang="scss">
.bottom-bar {
  height: 49px;
  text-align: center;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  .left {
    width: 187px;
    display: flex;
    font-size: 14px;
    .icon {
      width: 22px;
      height: 22px;
      margin: 10px auto 3px;
      background: url('~assets/img/detail/detail_bottom.png') no-repeat 22px 3px/30%;
      padding-top: 22px;
      flex: 1;
    }
    .service {
      background-position: 22px -44px;
    }
    .shop {
      background-position: 22px -82px;
    }
  }

  .right {
    width: 188px;
    display: flex;
    .cart {
      line-height: 49px;
      flex: 1;
      background-color: #ecc600;
      color: black;
    }
    .buy {
      line-height: 49px;
      background-color: #f15d7c;
      color: white;
      flex: 1;
    }
  }
}
</style>
