<template>
  <div id="home">
    <NavBar class="home-nav">
      <div slot="center">购物街</div>
    </NavBar>
    <Scroll class="content">
      <HomeSwiper :banners="banners" class="home-swiper"> </HomeSwiper>
      <Recommend :recommends="recommends"></Recommend>
      <Feature> </Feature>
      <TabControl
        :title="['流行', '新款', '精选']"
        class="tab-control"
        @tabClick="tabClick"
      ></TabControl>
      <GoodList :goods="showGoods"></GoodList
    ></Scroll>
  </div>
</template>
<script>
// 导入视图组件
import HomeSwiper from './childComps/HomeSwiper'
import Recommend from 'views/home/childComps/Recommend'
import Feature from 'views/home/childComps/Feature'

// 导入公共组件
import NavBar from 'common/navbar/NavBar.vue'
import TabControl from 'components/content/tabControl/TabControl'
import Scroll from 'common/scroll/Scroll'

// 导入业务组件
import GoodList from 'components/content/goods/GoodList'

// 导入请求js文件
import { getHomeMultiData, getHomeGoods } from 'api/home.js'

export default {
  name: 'home',
  components: {
    NavBar,
    HomeSwiper,
    Recommend,
    Feature,
    TabControl,
    GoodList,
    Scroll
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop'
    }
  },
  created() {
    // 请求多种数据
    this.getHomeMultiData()
    // 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    //网络请求相关方法
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        this.banners = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.data.list)
        this.goods[page] = page
      })
    },
    // 子向父传值的方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    }
  }
}
</script>

<style lang="scss" scope>
#home {
  padding-top: 44px;
  height: 100vh;
  .home-nav {
    background-color: $color-tint;
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 2;
  }

  .content {
    height: 300px;
    overflow: hidden;
    .tab-control {
      position: sticky;
      top: 44px;
    }
  }
}
</style>
