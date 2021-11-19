import Vue from 'vue'
import VueRouter from 'vue-router'
// import test from './../components/HelloWorld.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/test',
    component : () => import( '../views/test.vue' )
  },
  {
    path: '/book',
    name: 'Book',
    component: () => import('../views/Book.vue'),
    children : [
      {
        path : 'form',
        component: () => import('../components/book/form.vue'),
      },
      {
        path : 'view',
        component : () => import('../views/About.vue'),
      },
      {
        path : '',
        redirect : 'from'
      },
      {
        path : '*',
        redirect : 'form'
      }
    ]
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/Order.vue'),
    children : [
      {
        path : 'view',
        component: () => import('../components/order/view.vue'),
      },
      {
        path : 'about',
        component : () => import('../views/About.vue'),
      },
      {
        path : '*',
        redirect : 'view'
      },
      {
        path : '',
        redirect : 'view'
      },
    ]
  },
]

const router = new VueRouter({
  mode : 'history',
  routes
})

export default router
