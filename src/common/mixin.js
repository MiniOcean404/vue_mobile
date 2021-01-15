export const itemListMixin = {
  mounted() {
    console.log('混入的内部代码')
  }
}

import BackTop from 'components/content/backtop/BackTop'

export const backTop = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    // 回到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    }
  }
}
