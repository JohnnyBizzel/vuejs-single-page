import Vue from 'vue'
import VueRouter from 'vue-router'
// import Category from './theme/Category.vue'
// import Login from './theme/Login.vue'
import NotFound from './theme/NotFound.vue'
// Lazy loading...
const Category = () => System.import('./theme/Category.vue')
const Login = () => System.import('./theme/Login.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history', // means you don't need /#/path in the URI
  linkActiveClass: 'is-active', // for setting the CSS in Bulma
  scrollBehavior: (to, from, savedPosition) => ({ y: 0 }), // scroll to page top
  routes: [
    { path: '/category/:id', name: 'category', component: Category },
    { path: '/login', component: Login },
    { path: '/', redirect: '/category/:id' },
    { path: '*', component: NotFound }
  ]
})

export default router
