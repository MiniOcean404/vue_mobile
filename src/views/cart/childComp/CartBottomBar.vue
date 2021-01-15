<template>
  <div class="cart-bottom-bar">
    <div class="all-selection">
      <CheckBotton
        @clickCheck="clickCheck"
        :is-check="totalSelect"
      ></CheckBotton>
      <span>全选</span>
    </div>
    <div class="summation">
      <span>合计:</span>
      <span>{{ totalPrice }}</span>
    </div>
    <div class="gocalc">
      <span>去结算：{{ checkedLength }}</span>
    </div>
  </div>
</template>

<script>
import CheckBotton from 'components/content/checkbotton/CheckBotton'
import { mapGetters } from 'vuex'

export default {
  name: 'CartBottomBar',
  components: {
    CheckBotton
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['cartList']),
    //合计总计
    totalPrice() {
      return (
        '￥' +
        this.cartList
          .filter(item => {
            return item.checked == true
          })
          .reduce((pre, item) => {
            return pre + item.preice * item.count
          }, 0)
          .toFixed(2)
      )
    },
    // 去结算的数量
    checkedLength() {
      return this.cartList
        .filter(item => {
          return item.checked
        })
        .reduce((pre, item) => {
          return pre + item.count
        }, 0)
    },
    // 自动全选的状态
    totalSelect() {
      if (this.cartList.length == 0) return false
      return !this.cartList.find(item => {
        return !item.checked
      })
    }
  },
  methods: {
    // 点击按钮控制商品的状态从而控制全选按钮的状态
    clickCheck() {
      this.cartList.map(item => {
        return (item.checked = !this.totalSelect)
      })
    }
  }
}
</script>

<style lang="scss">
.cart-bottom-bar {
  height: 40px;
  font-size: 16px;
  background-color: #eee;
  display: flex;
  .all-selection {
    width: 57px;
    display: flex;
    align-items: center;
    margin-left: 5px;
    span {
      margin-left: 5px;
      margin-top: 2px;
    }
  }
  .summation {
    flex: 1;
    margin-left: 15px;
    display: flex;
    align-items: center;
    span {
      margin-top: 2px;
    }
  }
  .gocalc {
    width: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f80000;
    color: white;
    span {
      margin-top: 2px;
    }
  }
}
</style>
