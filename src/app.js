import Vue from 'vue'
import AppLayout from './theme/Layout.vue'
import router from './router'
import store from './vuex/index.js'
const app = new Vue({
  router,
  ...AppLayout,
  store
})
// const app = new Vue({
//   render: h => h(AppLayout)
// })
// Vue.component('app', {
//   template: `
//     <div id="app">
//       <nav class="nav has-shadow">
//         <div class="container">
//           <a href="/">
//             <img src="http://bit.ly/vue-img" alt="VUE SPA" />
//           </a>
//         </div>
//       </nav>
//       <section class="main-section section"></section>
//       <footer class="footer">
//         <div class="container">
//           <div class="content has-text-centered">
//             Follow us on
//             <a href="https://twitter.com/JohnnyBizzel"
//             target="_blank">Twitter</a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   `
// })

/* this render == template: `<app></app>` 
const app = new Vue({
  render: h => h('app')
})
*/

// /* for hot reloading add the template */
// const app = new Vue({
//   data: {
//     hello: 'Hey Now!! Hank Kingsley'
//   },
//   template: '<div id="app">{{ hello }}</div>'
// })

export { app, router, store }
