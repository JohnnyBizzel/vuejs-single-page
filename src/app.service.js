import axios from 'axios'

axios.defaults.baseURL = 'https://api.fullstackweekly.com'

// returns a token if it exists to any request we make (instead of lines 27-31)
axios.interceptors.request.use(function (config) {
  // this is for server side rendering
  if (typeof window === 'undefined') {
    return config
  }
  //
  const token = window.localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const appService = {
  getPosts (categoryId) {
    return new Promise((resolve) => {
      axios.get(`/wp-json/wp/v2/posts?categories=${categoryId}&per_page=6`)
        .then(response => {
          console.log(response)
          resolve(response.data)
        })
    })
  },
  getProfile () {
    return { firstname: 'Bill', favoriteSandwich: 'Salmon' }
    /* TODO: FAILING with 401
    return new Promise((resolve) => {
      // pass any token in the request header
      axios.get('/services/profile.php'
      // ,
      //   {
      //     headers: {
      //       'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      //     }
      //   }
      )
        .then(response => {
          resolve(response.data)
        }).catch(response => {
          console.log('Error:' + response)
        })
    })
    */
  },
  login (credentials) {
    return new Promise((resolve, reject) => {
      axios.post('/services/auth.php', credentials)
        .then(response => {
          resolve(response.data)
        }).catch(response => {
          reject(response.status)
        })
    })
  }
}

export default appService
