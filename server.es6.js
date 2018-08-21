/* eslint-disable no-console */
const express = require('express');
const next = require('next')
const proxyMiddleware = require('http-proxy-middleware')
const cors = require('cors')

const devProxy = {
  '/api': {
    target: 'https://swapi.co/api/',
    pathRewrite: { '^/api': '/' },
    changeOrigin: true
  },
  '/lendApi': { //403
    target: 'https://libra.alpha.mo9.com/lendApi/api/libra/v2/',
    // target: 'http://192.168.6.27:3000/mock/187/api/libra/v2/',
    pathRewrite: { '^/lendApi': '' },
    changeOrigin: true
  },
  '/monkeyApi': { //这是可以的
    target: 'https://libra.alpha.mo9.com/monkeyApi/api/monkey/v1/',
    pathRewrite: { '^/monkeyApi': '' },
    changeOrigin: true
  }

}

const port = parseInt(process.env.PORT, 10) || 3000
const env = process.env.NODE_ENV
const dev = env !== 'production'
const app = next({
  dir: '.', // base directory where everything is, could move to src later
  dev
})

const handle = app.getRequestHandler()

let server
app
  .prepare()
  .then(() => {
    server = express()

    // server.options('*', cors())
    // Set up the proxy.
    if (dev && devProxy) {

      Object.keys(devProxy).forEach(function (context) {
        server.use(proxyMiddleware(context, devProxy[context]))
      })
    }

    server.all('*', (req, res) => handle(req, res))

    server.listen(port, err => {
      if (err) {
        throw err
      }
      console.log(`> Ready on port ${port} [${env}]`)
    })
  })
  .catch(err => {
    console.log('An error occurred, unable to start the server')
    console.log(err)
  })
