const mongoose = require('mongoose')
const { info, error } = require('./util/logger')
const express = require('express')
const cors = require('cors')
const PostRouter = require('./controller/post.controller')
const UserRouter = require('./controller/user.controller')
const { errorHandler } = require('./middle/errorHandler')
const app = express()
require('dotenv').config()
const config = require('./util/config')

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to the Blog API!</h1>`)
})

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        info('Connect to MongoDB Database!')
    })
    .catch((err) => error(err))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', PostRouter)
app.use('/api/users', UserRouter)

if(process.env.NODE_ENV === 'test') {
    const TestRouter = require('./controller/test.controller')
    app.use('/api/test', TestRouter)
}

app.use(errorHandler)

module.exports = app
