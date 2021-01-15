import { ADD_COUNTER, ADD_PRODUCT } from './mutation-types'

export default {
  [ADD_COUNTER](state, oldProduct) {
    oldProduct.count++
  },
  [ADD_PRODUCT](state, payload) {
    // console.log(payload)
    payload.count = 1
    state.cartList.push(payload)
  }
}
