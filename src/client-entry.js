import { app, router } from './app'
router.onReady(() => {
  app.$mount('#app')
})

// **** NEEDED for hot reloading before adding Vue files
// if (module.hot) {
//   module.hot.accept()
// }
