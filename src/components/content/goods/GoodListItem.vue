<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price"> {{ goodsItem.price }}</span>
      <span class="collect"> {{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="scss">
.goods-item {
  width: 48%;
  font-size: 12px;
  margin-bottom: 10px;
  img {
    width: 100%;
    border-radius: 5px;
    margin-bottom: 5px;
  }
  .goods-info {
    text-align: center;
    p {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-bottom: 3px;
    }
    .price {
      color: $color-tint;
      margin-right: 20px;
    }
    .collect {
      position: relative;
      &::before {
        content: '';
        position: absolute;
        left: -15px;
        top: -1px;
        width: 14px;
        height: 14px;
        // 00/14px/14px 分别是 左右xy距离 和左右拉伸大小
        background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
      }
    }
  }
}
</style>
