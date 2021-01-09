<template>
  <Swiper class="detail-swiper">
    <SwiperItem v-for="(item, index) in topImages" :key="index">
      <img :src="item" alt="" />
    </SwiperItem>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper/index'

export default {
  name: 'DetailSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scope>
.detail-swiper {
  height: 300px;
}
</style>
