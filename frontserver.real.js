const opn = require('opn')
const path = require('path')
const express = require('express')
const uuid = require('uuid')
const fs = require('fs')

const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

require('dotenv').config({ path: './config/real.env' })
const config = require('./webpack.prod.config.js')

const port = process.env.PORT || 8889
const app = express()


// this middleware serves all js files as gzip
app.use(function (req, res, next) {
  const originalPath = req.path

  if (!originalPath.startsWith('/bundle')) {
    next()
    return
  }

  try {
    if (originalPath.endsWith('.css')) {
      res.set('Content-Type', 'text/css')
    }
    res.append('Content-Encoding', 'gzip')
    res.setHeader('Vary', 'Accept-Encoding')
    res.setHeader('Cache-Control', 'public, max-age=512000')
    req.url = `${req.url}.gz`
  } catch (e) {
    console.log(e)
  }

  next()
})

app.use(express.static(path.join(__dirname, '/dist')))

app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
});

app.listen(port, '0.0.0.0', (err) => {
    if (err) {
        logger.log(err);
    }
});
