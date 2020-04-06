import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

/**
 *NOOE_ENV如果是在webpack编译时，如果我们是npm run dev 的话，就是一个dev环境，如果我们是npm run build 的话，它就会变成production环境
所以我们线下调试的时候，我们debug就设置为true。线下模式要开启严格模式，这个严格模式会检测这个state的修改是不是来源于communication,上线要把strict
 删掉，不然影响性能
 */

const debug = process.env.NOOE_ENV !== 'production'

//相当于工厂模式，单例
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  // strict,
  plugins: debug ? [createLogger()] : []
})



