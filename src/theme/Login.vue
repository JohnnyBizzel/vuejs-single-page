<template>
  <div class="content">
    <div v-if="isAuthenticated">
      Hello authenticated user
      <!--<p>Hello {{ profile.firstname }}!</p>-->
      <!--<p>Have you eaten your {{profile.favoriteSandwich}} sandwich?</p>-->
      <br/>
      <button v-on:click="logout()" class="button is-primary">
        Logout
      </button>
    </div>
    <div v-else>
    	<h2>Login</h2>
    	<div class="field is-horizontal">
    		<div class="field-label is-normal">
    		  <label class="label">Username</label>
    		</div>
    		<div class="field-body">
    		  <div class="field">
    			<div class="control">
    			  <input class="input" type="text" v-model="username"
    			  placeholder="Your username">
    			</div>
    		  </div>
    		</div>
    	</div>
    	<div class="field is-horizontal">
    		<div class="field-label is-normal">
    		  <label class="label">Password</label>
    		</div>
    		<div class="field-body">
    		  <div class="field">
    			<div class="control">
    			  <input class="input" type="password" v-model="password"
    			  placeholder="Your password">
    			</div>
    		  </div>
    		</div>
    	</div>
    	<div class="field is-horizontal">
    		<div class="field-label">
    		  <!-- Left empty for spacing -->
    		</div>
    		<div class="field-body">
    		  <div class="field">
    			<div class="control">
    			  <button @click="login()" class="button is-primary">
    				Login
    			  </button>
    			</div>
    		  </div>
    		</div>
    	</div>
  	</div>
  </div>
</template>
<script>
  import appService from '../app.service.js'
  //import eventBus from '../event-bus.js'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data () {
      return {
        username: '',
        password: ''//,
        //profile: {},
        // isAuthenticated: false
      }
    },
    computed: {
      ...mapGetters(['isAuthenticated'])
    },
    methods: {
      ...mapActions({
        logout: 'logout' // = this.$store.dispatch('logout')
      }),
      login () {
        this.$store.dispatch('login', { username: this.username, password: this.password})
          .then(() => {
                        this.username = '',
                        this.password = ''
                      })
        // appService.login({ username: this.username, password: this.password})
        //   .then((data) => {
        //     window.localStorage.setItem('vue-spa-token', data.token)
        //     window.localStorage.setItem('vue-spa-tokenExpiration', data.expiration)
        //     // this.isAuthenticated = true
        //     this.username = '',
        //     this.password = ''
        //   })
        //   .catch((err) => {
        //     window.alert('Could not log in!')
        //     console.log('Login FAIL: ' + err)
        //   })
      }//,
      //logout () {
      //  window.localStorage.setItem('vue-spa-token', null)
      //  window.localStorage.setItem('vue-spa-tokenExpiration', null)
      //  // this.isAuthenticated = false
      //}
    }//,
    //watch: {
      /*isAuthenticated: function(val) {
        if (val) {
          // TODO: Fails due to 401 error on API
          // appService.getProfile().then(profile => {
          //   this.profile = profile
          // })
          this.profile = appService.getProfile()
        } else {
          // reset profile if not auth
          this.profile = {}
        }
        console.log(this.profile)
        eventBus.$emit('authStatusUpdated', val)
      }
      */
    //}, // logic moves to vuex
    /*created () {
      console.log('created')
      let expiration = window.localStorage.getItem('vue-spa-tokenExpiration')
      var unixTimestamp = new Date().getTime() / 1000
      console.log(unixTimestamp)
      // check token has not expired yet
      if (expiration !== null && parseInt(expiration) - unixTimestamp > 0) {
        console.log('setting Auth = true')
        this.isAuthenticated = true
      }
    }*/
  }
</script>