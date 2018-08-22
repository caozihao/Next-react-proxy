const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const proxyMiddleware = require('http-proxy-middleware')// Error next is not a function
// const proxyMiddleware = require('koa-server-http-proxy') //前端可以用，但是页面刷新后不行
const c2k = require('koa2-connect') //这个和 proxyMiddleware一起用就可以，但是页面刷新后不行

const port = parseInt(process.env.PORT, 10) || 3000
const env = process.env.NODE_ENV
const dev = env !== 'production'

const app = next({
  dir: '.', // base directory where everything is, could move to src later
  dev
})

const handle = app.getRequestHandler();

// 反向代理配置
const devProxy = {
  '/lendApi': { //403
    target: 'https://libra.alpha.mo9.com/lendApi/api/libra/v2/',
    pathRewrite: { '^/lendApi': '' },
    changeOrigin: true
  },
}

app.prepare()
  .then(() => {
    const server = new Koa()
    const router = new Router()

    console.log('后端框架-> koa2');
    if (devProxy) {
      Object.keys(devProxy).forEach(function (context) {
        // koa-server-http-proxy
        server.use(c2k(proxyMiddleware(context, devProxy[context])))

        // koa-http-proxy-middleware
        // server.use(httpProxy(context, devProxy[context]))

      })
    }

    router.get('*', async (ctx, next) => {
      const { req, res } = ctx;
      await handle(req, res)
      ctx.respond = false
    })

    server.use(async (ctx, next) => {
      ctx.res.statusCode = 200;
      await next()
    })

    server.use(router.routes())

    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
