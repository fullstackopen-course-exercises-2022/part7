const http = require('http')
const app = require('./app')
const { info } = require('./util/logger')
const config = require('./util/config')

const webServer = http.createServer(app)

webServer.listen(config.PORT, () => {
    info(`Server running on port ${config.PORT}`)
})