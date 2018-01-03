import { app, router } from './app'

export default context => {
  router.push(context.url)
  return app
}
