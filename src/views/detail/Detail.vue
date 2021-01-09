<template>
  <div id="detail">
    <DetailNavBar></DetailNavBar>
    <DetailSwiper :topImages="topImages"></DetailSwiper>
  </div>
</template>

<script>
// 导入子组件
import DetailNavBar from 'views/detail/childComp/DetailNavBar'
import DetailSwiper from 'views/detail/childComp/DetailSwiper'

// 导入api文件
import { getDetail } from 'api/detail'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper
  },
  data() {
    return {
      id: null,
      topImages: []
    }
  },
  created() {
    this.id = this.$route.params.id
    getDetail(this.id).then(res => {
      this.topImages = res.data.result.itemInfo.topImages
    })
  }
}
</script>

<style lang=""></style>
