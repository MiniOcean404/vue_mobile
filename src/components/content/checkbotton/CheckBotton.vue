<template>
  <div class="check-botton" :class="{ check: isCheck }" @click="clickCheck">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: 'CheckBotton',
  props: {
    isCheck: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    clickCheck() {
      this.$emit('clickCheck')
    }
  }
}
</script>

<style lang="scss" scope>
.check-botton {
  width: 20px;
  height: 20px;
  border: 2px solid #aaa;
  border-radius: 50%;
  img {
    width: 16px;
    height: 16px;
  }
}
.check {
  background-color: red;
  border-color: red;
}
</style>
