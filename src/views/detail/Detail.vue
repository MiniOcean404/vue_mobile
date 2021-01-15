<template>
  <div id="detail">
    <DetailNavBar
      class="detail-nav"
      @toTitle="toTitle"
      ref="nav"
    ></DetailNavBar>
    <Scroll
      class="wrapperSize"
      ref="scroll"
      :probeType="3"
      :pullUpLoad="true"
      @scrollon="contentScroll"
      :probe-typ="3"
    >
      <DetailSwiper :topImages="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailParamInfo
        :param-info="paramInfo"
        ref="paramInfo"
      ></DetailParamInfo>
      <DetailCommentInfo
        :comment-info="commentInfo"
        ref="commentInfo"
      ></DetailCommentInfo>
      <DetailGoodsInfo
        :detail-info="detailInfo"
        @imageLoad="imageRefresh"
      ></DetailGoodsInfo>
      <div class="recommendTitle" ref="recommendTitle">商品推荐</div>
      <GoodList :goods="recommends"></GoodList>
    </Scroll>
    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
    <DetailBottomBar @addToCart="addToCart"></DetailBottomBar>
  </div>
</template>

<script>
// 导入子组件
import DetailNavBar from 'views/detail/childComp/DetailNavBar'
import DetailSwiper from 'views/detail/childComp/DetailSwiper'
import DetailBaseInfo from 'views/detail/childComp/DetailBaseInfo'
import DetailShopInfo from 'views/detail/childComp/DetailShopInfo'
import DetailGoodsInfo from 'views/detail/childComp/DetailGoodsInfo'
import DetailParamInfo from 'views/detail/childComp/DetailParamInfo'
import DetailCommentInfo from 'views/detail/childComp/DetailCommentInfo'
import DetailBottomBar from 'views/detail/childComp/DetailBottomBar'

// 导入公共组件
import Scroll from 'components/common/scroll/Scroll'

//导入业务组件
import GoodList from 'components/content/goods/GoodList'

// 导入工具js
import { debounce } from 'common/utils'

// 导入api文件
import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'api/detail'

// 导入混入
import { backTop } from 'common/mixin'

import { mapActions } from 'vuex'

export default {
  name: 'Detail',
  mixins: [backTop],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    Scroll,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodList,
    DetailBottomBar
  },
  data() {
    return {
      id: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      titleTopY: [],
      getTitleTopY: null,
      currentIndex: 0
    }
  },
  created() {
    // 路由id信息
    this.id = this.$route.params.id
    //根据路由id获取商品各种信息
    this.getDetailById()
    // 推荐数据请求
    this.getRecommend()
  },
  methods: {
    ...mapActions(['addCart']),
    /**
     *请求相关
     */
    getDetailById() {
      getDetail(this.id).then(res => {
        const data = res.data.result
        this.topImages = data.itemInfo.topImages

        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        )

        this.shop = new Shop(data.shopInfo)

        this.detailInfo = data.detailInfo

        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        )

        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })
    },
    getRecommend() {
      getRecommend().then(res => {
        this.recommends = res.data.data.list
      })

      this.getTitleTopY = debounce(() => {
        this.titleTopY.push(0)
        this.titleTopY.push(this.$refs.paramInfo.$el.offsetTop - 44)
        this.titleTopY.push(this.$refs.commentInfo.$el.offsetTop - 44)
        this.titleTopY.push(this.$refs.recommendTitle.offsetTop - 44)
      }, 100)
    },
    /**
     * scroll相关
     */
    refresh() {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    },
    imageRefresh() {
      this.refresh()
      this.getTitleTopY()
    },
    contentScroll(positon) {
      const y = -positon.y
      const length = this.titleTopY.length
      for (let i = 0; i < length; i++) {
        if (
          //防止赋值过于频繁
          this.currentIndex != i &&
          // 对范围进行判断
          ((i < length - 1 &&
            y >= this.titleTopY[i] &&
            y < this.titleTopY[i + 1]) ||
            (i == length - 1 && y >= this.titleTopY[i]))
        ) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      this.isShowBackTop = y > 1000 ? true : false
    },
    /**
     * 到标题某个位置
     */
    toTitle(index) {
      this.$refs.scroll.scrollTo(0, -this.titleTopY[index], 1000)
    },
    // 添加到购物车
    addToCart() {
      // 1.获取购物车信息
      const product = {}
      product.id = this.id
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.preice = this.goods.realPrice
      product.checked = true

      // 2.将商品加入到购物车中
      this.addCart(product).then(res => {
        this.$toast.show(res, 2000)
      })
    }
  }
}
</script>

<style lang="scss">
$height: 44px;

#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  //因为子元素的百分比宽度根据父元素的高度设定
  height: 100vh;

  .wrapperSize {
    /** 
    定位方式
    position: absolute;
    top: 44px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    overflow: hidden;
    */
    height: calc(100% - #{$height} - 49px);
    overflow: hidden;
  }

  // .detail-nav {
  //   position: relative;
  // }
  .recommendTitle {
    height: 40px;
    line-height: 40px;
    padding-left: 8px;
  }
}
</style>
