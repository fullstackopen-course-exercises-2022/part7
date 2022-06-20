const TestRouter = require('express').Router()
const Blog = require('../models/post.model')
const User = require('../models/users.model')

TestRouter.post('/reset', async (req, res) => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    res.status(204).send()
})

module.exports = TestRouter