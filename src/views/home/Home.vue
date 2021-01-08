<template>
  <div id="home">
    <NavBar class="home-nav">
      <div slot="center">购物街</div>
    </NavBar>
    <Scroll
      class="wrapeerSize"
      ref="scroll"
      :probe-type="3"
      :pullUpLoad="true"
      @scrollon="contentScroll"
      @pullUpLoad="loadMore"
    >
      <HomeSwiper :banners="banners" class="home-swiper"> </HomeSwiper>
      <Recommend :recommends="recommends"></Recommend>
      <Feature> </Feature>
      <TabControl
        :title="['流行', '新款', '精选']"
        class="tab-control"
        @tabClick="tabClick"
      ></TabControl>
      <GoodList :goods="showGoods"></GoodList>
    </Scroll>
    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
  </div>
</template>
<script>
// 导入视图组件
import HomeSwiper from './childComps/HomeSwiper'
import Recommend from 'views/home/childComps/Recommend'
import Feature from 'views/home/childComps/Feature'

// 导入公共组件
import NavBar from 'common/navbar/NavBar.vue'
import Scroll from 'common/scroll/Scroll'

// 导入业务组件
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from 'components/content/goods/GoodList'
import BackTop from 'components/content/backtop/BackTop'

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
    Scroll,
    BackTop
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
      currentType: 'pop',
      isShowBackTop: false
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

        this.refresh()
      })
    },

    // scroll方法
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    // scroll方法----scroll传递数据监听的方法
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000 ? true : false
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.scroll.finishPullUp()
    },
    // scroll方法----scroll内置方法（refresh（）重新计算scroll的加载的高度，this.$nextTick（）是在数据请求完，且dom渲染完成后进行加载）
    refresh() {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
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
      this.refresh()
    }
  }
}
</script>

<style lang="scss" scope>
#home {
  position: relative;
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

  .wrapeerSize {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    // height: 300px;
    // overflow: hidden;
    .tab-control {
      position: sticky;
      top: 44px;
    }
  }
}
</style>
