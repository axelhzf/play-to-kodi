require('isomorphic-fetch');

var express = require('express')
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var path = require("path")


var app = express()

if (process.env.NODE_ENV === "development") {
  var compiler = webpack(require("../webpack.config.js"));
  app.use("/build", webpackDevMiddleware(compiler, {
    // options
  }));
} else {
  app.use("/build", express.static(path.join(__dirname, '..', 'build')))
}

app.get("/api/play", async (req, res) => {
  const {magnet} = req.query

  console.log("playing magnet", magnet)

  const body = {
    jsonrpc: '2.0',
    method: 'Player.Open',
    id: 1,
    params: {
      item: {
        file: `plugin://plugin.video.xbmctorrent/play/${magnet}`
      }
    }
  };

  const response = await fetch('http://192.168.1.39/jsonrpc',
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

  const responseBody = await response.json();
  res.send(responseBody)
})

app.use(function (req, res) {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title></title>
    <link rel="stylesheet" href="/build/style.css">
</head>
<body>

<div id='root'></div>

<script src='/build/bundle.js'></script>

</body>
</html>
  `)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})