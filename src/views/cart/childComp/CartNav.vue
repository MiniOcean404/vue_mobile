<template>
  <div>
    <NavBar class="nav-bar" background-color="#ff699c">
      <div slot="center">购物车({{ cartLength }})</div>
    </NavBar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import { mapGetters } from 'vuex'
export default {
  name: 'CartNav',
  components: {
    NavBar
  },
  computed: {
    ...mapGetters(['cartLength'])
  }
}
</script>

<style lang="scss">
.nav-bar {
  color: white;
}
</style>
