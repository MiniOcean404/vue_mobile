<template>
  <div id="home">
    <NavBar class="home-nav">
      <div slot="center">购物车</div>
    </NavBar>
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import { getHomeMultData } from 'api/home.js'
export default {
  name: 'home',
  components: {
    NavBar
  },
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  created() {
    getHomeMultData().then(res => {
      console.log(res)
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
  }
}
</script>
<style lang="scss" scope>
.home-nav {
  background-color: $color-tint;
  color: #fff;
}
</style>
