const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const serialize = require('serialize-javascript')
// these next 2 lines are for server side
const { createBundleRenderer } = require('vue-server-renderer')
const isProd = typeof process.env.NODE_ENV !== 'undefined' && (process.env.NODE_ENV === 'production')
let renderer

const indexHTML = (() => {
  return fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8')
})()

if (isProd) {
  app.use('/', express.static(path.resolve(__dirname, './dist')))
} else {
  app.use('/dist', express.static(path.resolve(__dirname, './dist')))
}

if (isProd) {
  const bundlePath = path.resolve(__dirname, './dist/server/main.js')
  renderer = createBundleRenderer(fs.readFileSync(bundlePath, 'utf-8'))
} else {
  // require("./build/dev-server")(app); // this is all you need for client side
  // the 2nd param is a callback to "onUpdate" see dev-server.js
  require('./build/dev-server')(app, bundle => {
    renderer = createBundleRenderer(bundle)
  })
}



// client side serves static index.html page **
app.get('*', (req, res) => {
  // The client-side rendered virtual DOM tree is not matching server-rendered content.
  const context = { url: req.url };
  // server side calls renderer before outputting html
  renderer.renderToString(context, (err, html) => {
    if (err) {
      console.log(err)
      return res.status(500).send('Server Error')
    }
    html = indexHTML.replace('{{ APP }}', html)
    html = html.replace('{{ STATE }}',
    `<script>window.__INITIAL_STATE__=${serialize(context.initialState, { isJSON: true })}</script>`)
    res.write(html)
    res.end()
  })
  // **
  // res.write(indexHTML);
  // res.end();
})

const port = process.env.PORT || 3000
app.listen(port, process.env.IP || '0.0.0.0', () => {
  console.log('Server listening at: ', port)
})
