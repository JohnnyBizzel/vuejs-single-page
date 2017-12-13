import Vue from 'vue'

/* for hot reloading add the template */
const app = new Vue({
  data: {
    hello: 'Hey Now!! Hank Kingsley'
  },
  template: '<div id="app">{{ hello }}</div>'
})

export { app }
