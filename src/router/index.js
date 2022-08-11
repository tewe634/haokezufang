import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const orginPush = VueRouter.prototype.push
const orginReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, reslve, reject) {
  if (reslve && reject) {
    orginPush.call(this, location, reslve, reject)
  } else {
    orginPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
VueRouter.prototype.replace = function (location, reslve, reject) {
  if (reslve && reject) {
    orginReplace.call(this, location, reslve, reject)
  } else {
    orginReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/views/Home'),
    meta: { isShow: true, footer: true, num: 0 },
    children: [
      {
        path: 'list',
        component: () => import('@/views/List'),
        meta: { isShow: false, footer: true, num: 1 }
      },
      {
        path: 'news',
        component: () => import('@/views/news'),
        meta: { isShow: false, footer: true, num: 2 }
      },
      {
        path: 'profile',
        component: () => import('@/views/profile'),
        meta: { isShow: false, footer: true, num: 3 }
      }
    ]
  },
  {
    path: '/city',
    component: () => import('@/views/city'),
    meta: { footer: false }
  },
  {
    path: '/map',
    component: () => import('@/views/map'),
    meta: { footer: false, isShow: false }
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    meta: { footer: false, isShow: false }
  },
  {
    name: 'detail',
    path: '/detail/:code',
    component: () => import('@/views/detail'),
    meta: { footer: false, isShow: false }
  },
  {
    name: 'favorate',
    path: '/favorate',
    component: () => import('@/views/favorate'),
    meta: { footer: false, isShow: false }
  },
  {
    name: 'rent',
    path: '/rent',
    component: () => import('@/views/rent'),
    meta: { footer: false, isShow: false, isAdd: false, isSearch: false },
    children: [
      {
        name: 'add',
        path: 'add',
        component: () => import('@/views/ADD'),
        meta: { footer: false, isShow: false, isAdd: true, isSearch: false }
      },
      {
        name: 'search',
        path: 'search',
        component: () => import('@/views/search'),
        meta: { footer: false, isShow: false, isAdd: false, isSearch: true }
      }
    ]
  },
  {
    path: '/registe',
    component: () => import('@/views/registe'),
    meta: { footer: false, isShow: false }
  }
]

const router = new VueRouter({
  routes
})

export default router
