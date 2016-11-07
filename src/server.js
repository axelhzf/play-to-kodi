require('isomorphic-fetch');

var express = require('express')
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var path = require("path")
var sharp = require('sharp');
var http = require('http')
var fs = require('fs')
var request = require('request')


var app = express()

if (process.env.NODE_ENV === "development") {
  var compiler = webpack(require("../webpack.config.js"));
  app.use("/build", webpackDevMiddleware(compiler, {
    noInfo: true
  }));
} else {
  app.use("/build", express.static(path.join(__dirname, '..', 'build')))
}

app.get("/images", (req, res) => {

  const {url, width, height} = req.query

  const cacheFile = path.join(__dirname, "..", ".cache", `${width}x${height}-${encodeURIComponent(url)}`)

  fs.stat(cacheFile, (err, stats) => {
    if (err && err.code !== "ENOENT") {
      console.error(err)
      return res.sendStatus(500)
    }
    if (stats) return res.sendFile(cacheFile)

    var transformer = sharp()
      .resize(parseInt(width, 10), parseInt(height, 10))
      .on('error', function sharpError(err) {
        console.error(err)
        res.sendStatus(500);
      });

    try {
      request(url)
        .pipe(transformer)
        .pipe(fs.createWriteStream(cacheFile))
        .on('close', () => {
          res.sendFile(cacheFile, { maxAge: 0 })
        })
        .on('error', function (err) {
          console.error(err)
          res.sendStatus(500);
        });
    } catch (e) {
      res.sendStatus(500)
    }
  });

})

app.get("/api/play", (req, res) => {
  const {magnet} = req.query

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

  fetch('http://192.168.1.39/jsonrpc', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(body => res.send(body))
    .catch(e => res.sendStatus(500))
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