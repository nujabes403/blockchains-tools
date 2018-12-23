const opn = require('opn')
const path = require('path')
const uuid = require('uuid')
const express = require('express')

const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

require('dotenv').config({ path: './config/local.env' })
const config = require('./webpack.config.js')

const port = process.env.PORT
const app = express()

const compiler = webpack(config)
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false,
  },
})

app.use('/', express.static(path.resolve(__dirname)))
app.use(middleware)
app.use(webpackHotMiddleware(compiler))
app.get('*', function response(req, res) {
  res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')))
  res.end()
})

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err)
  }
  opn(`http://localhost:${port}`);
})
