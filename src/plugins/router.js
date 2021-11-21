import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'; 

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component : () => import( '../views/login/Login.vue')
  },
  {
    path: '/user',
    meta: { requiresAuth: true, type : 'user' },
    component : () => import( '../views/user/Book.vue')
  },
  {
    path: '/book',
    name: 'Book',
    meta: { requiresAuth: true, type : 'admin' },
    component: () => import('../views/Book.vue'),
    children : [
      {
        meta: { requiresAuth: true, type : 'admin' },
        path : 'form',
        component: () => import('../components/book/form.vue'),
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
    meta: { requiresAuth: true },
    component: () => import('../views/Order.vue'),
    children : [
      {
        meta: { requiresAuth: true },
        path : 'view',
        component: () => import('../components/order/view.vue'),
      },
      {
        meta: { requiresAuth: true },
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
  {
    path : '*',
    redirect : '/login'
  },
  {
    path : '',
    redirect : '/login'
  }
]

const router = new VueRouter({
  mode : 'history',
  routes
})


router.beforeEach((to, _, next) => {
  const currentUser = {...store.getters['USER/getCurrentUser']};
  const isAuthenticated = currentUser.userId
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isAuthenticated) {
      return next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
})


export default router
