<template>
  <nav class="navbar has-shadow">
    <div class="container">
      <router-link to="/category/front-end">
        <img src="http://bit.ly/vue-img" alt="VUE SPA" />
      </router-link>
      <router-link class="navbar-item is-tab" to="/category/front-end">
        Front-end
      </router-link>
      <router-link class="navbar-item is-tab" :to="mobileRoute">
        Mobile
      </router-link>
      <router-link class="navbar-item is-tab" to="/login">
        <span v-if="isAuthenticated">Logout</span>
        <span v-else>Login</span>
      </router-link>
    </div>
  </nav>
</template>
<script>
  // import eventBus from '../event-bus.js'
  // export default {
  //   data () {
  //     return {
  //       isAuthenticated: false,
  //       mobileRoute: { name: 'category', params: { id: 'mobile' } }
  //     }
  //   },
  //   created () {
  //     eventBus.$on('authStatusUpdated', isAuthenticated => {
  //       this.isAuthenticated = isAuthenticated
  //     })
  //   }
  // }
  //
  // Using STORE:
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        mobileRoute: { name: 'category', params: { id: 'mobile' } }
      }
    },
    computed: {
      // isAuthenticated () {
      //   return this.$store.state.isAuthenticated
      // }
      ...mapGetters(['isAuthenticated'])
    }
  }
</script>
