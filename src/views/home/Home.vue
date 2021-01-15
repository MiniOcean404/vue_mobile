<template>
  <div id="home">
    <NavBar class="home-nav" backgroundColor="#ff699c">
      <div slot="center">购物街</div>
    </NavBar>
    <TabControl
      :title="['流行', '新款', '精选']"
      class="tab-control-b"
      @tabClick="tabClick"
      ref="tabControlB"
      v-show="isTabshow"
    ></TabControl>
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
        ref="tabControl"
      ></TabControl>
      <GoodList :goods="showGoods"></GoodList>
    </Scroll>
    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
  </div>
</template>
<script>
// 导入公共组件
import NavBar from 'components/common/navbar/NavBar.vue'
import Scroll from 'components/common/scroll/Scroll'

// 导入业务组件
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from 'components/content/goods/GoodList'

// 导入子视图组件
import HomeSwiper from 'views/home/childComps/HomeSwiper'
import Recommend from 'views/home/childComps/Recommend'
import Feature from 'views/home/childComps/Feature'

// 导入请求js文件
import { getHomeMultiData, getHomeGoods } from 'api/home.js'

// 导入混入js
import { backTop } from 'common/mixin'

export default {
  name: 'home',
  mixins: [backTop],
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
        pop: {
          page: 0,
          list: []
        },
        new: {
          page: 0,
          list: []
        },
        sell: {
          page: 0,
          list: []
        }
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isTabshow: false,
      saveY: 0
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

  /**
   * 切换tab栏保留状态
   */
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getSaveY()
  },

  methods: {
    /**
     * 网络请求相关方法
     */
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        this.banners = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list

        this.getOffsetTop()
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
    /**
     * 获取tabcontrol的offsettop
     */
    getOffsetTop() {
      this.$nextTick(() => {
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      })
    },
    //  子向父传值的方法
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
      this.$refs.tabControlB.currentIndex = index
      this.$refs.tabControl.currentIndex = index
      this.refresh()
    },
    /**
     * scroll方法
     */
    // scroll内置方法（refresh（）重新计算scroll的加载的高度，this.$nextTick（）是在数据请求完，且dom渲染完成后进行加载）
    refresh() {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    },

    // scroll传递数据监听的方法
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000 ? true : false
      this.isTabshow = -position.y > this.tabOffsetTop ? true : false
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.scroll.finishPullUp()
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
  }

  .wrapeerSize {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
  }
  .tab-control-b {
    position: relative;
    z-index: 3;
  }
}
</style>
