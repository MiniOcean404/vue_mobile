<template>
  <div id="cart">
    <CartNav></CartNav>
    <CartList></CartList>
    <CartBottomBar></CartBottomBar>
  </div>
</template>

<script>
// 导入子组件
import CartNav from './childComp/CartNav'
import CartList from './childComp/CartList'
import CartBottomBar from './childComp/CartBottomBar'

export default {
  name: 'Cart',
  components: {
    CartNav,
    CartList,
    CartBottomBar
  }
}
</script>

<style lang="scss">
#cart {
  height: 100vh;
}
</style>
