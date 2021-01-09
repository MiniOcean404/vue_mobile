<template>
  <div class="detailnavbar">
    <NavBar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="titles">
        <span
          v-for="(item, index) in title"
          :key="index"
          :class="{ active: currentIndex == index }"
          @click="clickToggleIndex(index)"
        >
          {{ item }}
        </span>
      </div>
    </NavBar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  data() {
    return {
      title: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    clickToggleIndex(index) {
      this.currentIndex = index
    },
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
.detailnavbar {
  .back {
    text-align: center;
    img {
      width: 25%;
      margin-top: 15px;
    }
  }
  .titles {
    display: flex;
    font-size: 15px;
    span {
      flex: 1;
    }
  }
}
.active {
  color: $color-tint;
}
</style>
