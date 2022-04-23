import Vue from 'vue'
import Vuex from 'vuex'
import createPersist from 'vuex-localstorage'
import filters from './modules/filters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

let localStorage = createPersist({
    namespace: 'sdg-tool-f7',
    initialState: {},
    expires: 30 * 24 * 60 * 60 * 1e3 // 30 days
})

export default new Vuex.Store({
  modules: {
    filters
  },
  strict: debug,
  plugins: [localStorage]
})
