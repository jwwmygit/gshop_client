import Vue from 'vue'
import VueRouter from 'vue-router'
import MSite from '../pages/MSite/MSite.vue'
import Search from '../pages/Search/Search.vue'
import Profile from '../pages/Profile/Profile.vue'
import Order from '../pages/Order/Order.vue'
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'

Vue.use(VueRouter);
//暴露出去
export default new VueRouter({
  routes:[
    {
      path:'/msite',
      component:MSite,
      meta: {
        isShow: true
      }
    },
    {
      path:'/search',
      component:Search,
      meta: {
        isShow: true
      }
    },
    {
      path:'/profile',
      component:Profile,
      meta: {
        isShow: true
      }
    },
    {
      path:'/order',
      component:Order,
      meta: {
        isShow: true
      }
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/shop',
      component:Shop,
      children:[
        {
          path:'/shop/goods',
          component:ShopGoods
        },
        {
          path:'/shop/info',
          component:ShopInfo
        },
        {
          path:'/shop/ratings',
          component:ShopRatings
        },
        {
          path:'',
          redirect: '/shop/goods'
        }
      ]
    },
    {
      path:'/',
      redirect: '/msite'
    },

  ]
})

