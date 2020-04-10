import Vue from 'vue'
import Router from 'vue-router'
import Basket from './components/Basket.vue'
import BasketCheckout from './components/BasketCheckout.vue'
import PayPage from './components/PayPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      //component: Home
    },
    {
      path: '/basket',
      name: 'basket',
      //component: Basket
      component: () => import(/* webpackChunkName: "basket" */ './components/Basket.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      //component: BasketCheckout
      component: () => import(/* webpackChunkName: "checkout" */ './components/BasketCheckout.vue')
    },
    {
      path: '/paypal',
      name: 'paypal',
      //component: PayPage
      component: () => import(/* webpackChunkName: "paypal" */ './components/PayPage.vue')
    }
  ]
})
