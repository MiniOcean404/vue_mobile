<template>
  <div class="cart-list-item">
    <CheckBotton
      class="main-check-botton"
      @click.native="checkedchange"
      :is-check="itemInfo.checked"
    ></CheckBotton>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ itemInfo.title }}</div>
      <div class="item-desc">{{ itemInfo.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{ itemInfo.preice }}</div>
        <div class="item-count right">x{{ itemInfo.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckBotton from 'components/content/checkbotton/CheckBotton'
export default {
  name: 'CartListItem',
  components: {
    CheckBotton
  },
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    checkedchange() {
      this.itemInfo.checked = !this.itemInfo.checked
    }
  }
}
</script>

<style lang="scss">
.cart-list-item {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 3px;
  border-bottom: 1px solid #ccc;
  .main-check-botton {
    align-self: center;
  }
  .item-img {
    padding: 5px;
    img {
      width: 80px;
      height: 100px;
      border-radius: 5px;
    }
  }
  .item-info {
    width: 70%;
    height: 113px;
    .item-title,
    .item-desc {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .item-title {
      padding: 5px 0 8px;
      font-size: 15px;
      font-weight: 700;
    }
    .item-desc {
      padding: 5px 0 8px 5px;
      font-size: 10px;
    }
    .info-bottom {
      margin-top: 33px;
      .item-price {
        color: red;
        font-weight: 555;
      }
      .item-count {
        margin-right: 10px;
      }
    }
  }
}
</style>
