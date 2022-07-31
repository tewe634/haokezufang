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
    path: '/registe',
    component: () => import('@/views/registe'),
    meta: { footer: false, isShow: false }
  }
]

const router = new VueRouter({
  routes
})

export default router
