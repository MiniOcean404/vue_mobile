import Toast from './Toast.vue'

const obj = {}

obj.install = function(Vue) {
  // 1.创建组件构造器构造
  const toastConstrutor = Vue.extend(Toast)
  // 2.根据组件构造器创建组件对象
  const toast = new toastConstrutor()
  // 3.将创建的组建对象挂在到某个元素
  toast.$mount(document.createElement('div'))
  // 4.将组件对象的结构添加到文档末尾
  document.body.appendChild(toast.$el)
  Vue.component('toast', Toast)
  Vue.prototype.$toast = toast
}
export default obj
