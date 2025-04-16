import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/shop/:shopId',
      name: 'shop',
      component: () => import('../views/ShopView.vue')
    } ,
    {
      path: '/goods/:goodId',
      name: 'goods',
      component: () => import('../views/GoodsView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue'),
      // meta:{
      //   isTab:false,
      // }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/UserView.vue')
    },
    {
      path: '/collection/:flag?',
      name: 'collection',
      component: () => import('../views/CollectionView.vue'),
      props: true  // 启用props传参
      // meta:{
      //   isTab:false,
      //   requireAuth:true
      // }
    },
    {
      path: '/shoppingcart',
      name: 'shoppingcart',
      component: () => import('../views/ShoppingCartView.vue')
    }
    ,
    {
      path: '/buy/:goodId',
      name: 'buy',
      component: () => import('../views/BuyOneView.vue')
    },
    {
      path: '/userindent/:flag?',  // 添加可选参数flag
      name: 'userindent',
      component: () => import('../views/UserIndentView.vue'),
      props: true  // 启用props传参
    }
  ]
})

export default router
