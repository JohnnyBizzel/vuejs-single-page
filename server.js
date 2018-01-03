const express = require('express');
const app = express();
const fs = require("fs");
const path = require("path");
// these next 2 lines are for server side
const { createBundleRenderer } = require('vue-server-renderer')
let renderer 

const indexHTML = (() => {
  return fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf-8");
})();

app.use("/dist", express.static(path.resolve(__dirname, "./dist")));

// require("./build/dev-server")(app); // this is all you need for client side
// the 2nd param is a callback to "onUpdate" see dev-server.js
require("./build/dev-server")(app, bundle => {
  renderer = createBundleRenderer(bundle)
});

// client side serves static index.html page **
app.get('*', (req, res) => {
  // server side calls renderer before outputting html
  renderer.renderToString({ url: req.url }, (err, html) => {
    if (err) {
      console.log(err)
      return res.status(500).send('Server Error')
    }
    html = indexHTML.replace('{{ APP }}', html)
    res.write(html);
    res.end;
  })
  // **
  // res.write(indexHTML);
  // res.end();
});

const port = process.env.PORT || 3000;
app.listen(port, process.env.IP || "0.0.0.0", () => {
  console.log("Server listening at: ", port);
});
