import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import VueCurrencyFilter from 'vue-currency-filter'
import VueMixpanel from 'vue-mixpanel'
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

Vue.use(VueMixpanel, {
  token: '892129a805c578d4d4ba8d7d9dbbc8fa'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
