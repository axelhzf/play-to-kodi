require('isomorphic-fetch');

var express = require('express')
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var path = require("path")
var http = require('http')
var fs = require('fs')
var request = require('request')
var child_process = require('child_process')


var app = express()

if (process.env.NODE_ENV === "development") {
  var compiler = webpack(require("../webpack.config.js"));
  app.use("/build", webpackDevMiddleware(compiler, {
    noInfo: true
  }));
} else {
  app.use("/build", express.static(path.join(__dirname, '..', 'build')))
}

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

  fetch('http://192.168.1.39:8080/jsonrpc', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(body => res.send(body))
    .catch(e => {
      console.error(e)
      res.sendStatus(500)
    })
})

app.all("/update", (req, res) => {
  let log = "> git pull\n";
  log += child_process.execSync('git pull').toString("utf-8")
  log += "\n > npm run build\n";
  log += child_process.execSync('npm run build').toString("utf-8")
  res.send({success: true, log})
  child_process.execSync('pm2 restart play-to-kodi')
});

app.use(function (req, res) {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title></title>
    <link rel="stylesheet" href="/build/style.css">
    <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
</head>
<body>

<div id='root'></div>

<script src='/build/bundle.js'></script>

</body>
</html>
  `)
})

app.listen(3000, function () {
  console.log('play-to-kodi listen on port 3000')
})