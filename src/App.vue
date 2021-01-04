<template>
  <div id="app">
    <MainTabBar></MainTabBar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabBar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>
<style lang="scss" scope>
@import 'assets/css/base.scss';
</style>
