import { ADD_COUNTER, ADD_PRODUCT } from './mutation-types'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      //payload传递过来的参数
      let oldProduct = context.state.cartList.find(item => {
        return item.id == payload.id
      })

      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量加1')
      } else {
        context.commit(ADD_PRODUCT, payload)
        resolve('添加了新的商品')
      }
    })
  }
}
