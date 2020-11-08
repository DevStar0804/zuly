import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import ('../pages/Home.vue')
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: () => import ('../pages/Contacts.vue')
  },
  {
    path: '/contact/:contact_id',
    name: 'contact',
    component: () => import ('../pages/Contact.vue')
  },
  {
    path: '/store/:id',
    name: 'store',
    component: () => import ('../pages/Store.vue')
  },
  {
    path: '/store/:id/live/:contact_id',
    name: 'live-streaming',
    component: () => import ('../pages/Live.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import ('../pages/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import ('../pages/Login.vue')
  },
  {
    path: '/set_password/:token',
    name: 'set_password',
    component: () => import ('../pages/SetPassword.vue')
  },
  {
    path: '/reset_password',
    name: 'reset_password',
    component: () => import ('../pages/ResetPassword.vue')
  },
  {
    // catch-all route to show a 404 page
    path: '*',
    component: () => import ('../pages/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
