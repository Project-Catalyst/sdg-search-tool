import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Proposal from '@/views/Proposal.vue'
import Research from '@/views/Research.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/research',
    name: 'Research',
    component: Research
  },
  {
    path: '/proposals/:id',
    name: 'proposal',
    component: Proposal
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return new Promise((resolve) => {
      if (savedPosition) {
        setTimeout(() => {
          resolve(savedPosition)
        }, 500)
      } else {
        resolve({ x: 0, y: 0 })
      }
    })
  },
})

/*
router.afterEach(() => {
  router.app.$mixpanel.track('view')
})
*/

export default router
