import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import VueCurrencyFilter from 'vue-currency-filter'
import Clipboard from 'v-clipboard'

import "./plugins/buefy"

Vue.config.productionTip = false
Vue.use(Clipboard)

Vue.use(VueCurrencyFilter, [{
  symbol : '$',
  thousandsSeparator: ',',
  fractionCount: 0,
  fractionSeparator: '.',
  symbolPosition: 'front',
  symbolSpacing: false,
  avoidEmptyDecimals: undefined,
},
{ // default name 'currency_2'
   name: 'currency_ada',
   symbol: '₳',
   thousandsSeparator: ',',
   fractionCount: 0,
   fractionSeparator: '.',
   symbolPosition: 'front',
   symbolSpacing: true,
   avoidEmptyDecimals: undefined,
 }
])

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
