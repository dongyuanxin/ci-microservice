const Koa = require('koa')
const app = new Koa()

const { PORT, AUTH_PATH } = require('./config')
const { main } = require('./main')
const { logger } = require('./util')

app.use(async (ctx, next) => {
    let url = ctx.url
    if (url.startsWith('/')) {
        url = url.slice(1)
    }
    
    if (!url.startsWith(AUTH_PATH)) {
        ctx.response.status = 404
        ctx.response.body = 'Page not found, please visit: "https://xxoo521.com/"'
    } else {
        ctx.response.body = 'success'
        main()
    }
    
    return
})

app.listen(PORT, () => logger.info(`listen at ${PORT}`))
