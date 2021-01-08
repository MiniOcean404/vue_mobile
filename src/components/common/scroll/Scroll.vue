<template>
  <div class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
BScroll.use(Pullup)

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      defult: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scrollStar()
    this.scrollOn()
    this.scrollPullUpLoad()
  },
  methods: {
    // 创建对象
    scrollStar() {
      this.scroll = new BScroll('.wrapper', {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
    },
    // 重新计算当前scroll内容的高度
    refresh() {
      this.scroll.refresh()
    },
    // 回到顶部
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time)
    },
    // 监听滚动位置
    scrollOn() {
      this.scroll.on('scroll', pos => {
        this.$emit('scrollon', pos)
      })
    },
    // 监听上拉事件
    scrollPullUpLoad() {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullUpLoad')
      })
    }
  }
}
</script>

<style lang="scss" scope></style>
