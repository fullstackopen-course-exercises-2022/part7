const Blog = require('../models/post.model')
const requiredLogin = require('../middle/requireLogin')
const PostRoute = require('express').Router()
const logger = require('../util/logger')
require('dotenv').config()

PostRoute.post('/', requiredLogin, async (req, res, next) => {
    const { title, author, url, likes } = req.body
    const { user } = req
    try {
        let post = await new Blog({
            title,
            author,
            url,
            likes,
            user: user?._id
        })
        const savedBlog = await post.save()
        user.blog = user.blog.concat(savedBlog._id)
        await user.save()
        res.status(201).json(post)
    } catch(err) {
        logger.error(err)
        next(err)
    }
})

PostRoute.get('/', async (req, res, next ) => {
    try {
        const response = await Blog.find({}).populate('user', 'id name')
        res.status(200).json(response)
    } catch(err) {
        logger.error(err)
        next(err)
    }
})

PostRoute.get('/:postId', async (req, res, next) => {
    const { postId } = req.params
    try {
        const response = await Blog.findById(postId)
        res.status(200).json(response)
    } catch(err) {
        logger.error(err)
        next(err)
    }
})

PostRoute.put('/:postId', requiredLogin, async (req, res, next) => {
    const { postId } = req.params
    const content = req.body
    if(!content.likes) {
        content.likes = 0
    }
    const blog = await Blog.findById(postId)
    if(blog.user._id.toString() === req.user._id.toString()) {
        const updateBlog = {
            title: content.title,
            author: content.author,
            url: content.url,
            likes: content.likes,
        }
        try {
            const response = await Blog.findByIdAndUpdate(postId, updateBlog, {new: true})
            res.status(200).json(response)
        } catch(err) {
            logger.error(err)
            next(err)
        }
    }
})

PostRoute.delete('/:postId', requiredLogin, async (req, res, next) => {
    const { postId } = req.params
    const blog = await Blog.findById(postId)
    try {
        if(req?.user?._id.toString() === blog?.user?._id?.toString()) {
            await Blog.findByIdAndDelete(postId)
            res.status(204).end()
        } else {
            return res.status(401).end()
        }
    } catch(err) {
        logger.error(err)
        next(err)
    }
})

PostRoute.put('/comments/:postId', requiredLogin, async (req, res, next) => {
    const {postId} = req.params
    try {
        const addComment = await Blog.findByIdAndUpdate(postId, {
            $push: {
                comments: {
                    text: req.body.text
                }
            }
        }, {
            new: true
        })
        res.status(200).json(addComment)
        if(!postId) {
            res.status(400).send({ msg: 'Post was not found!' })
        }
    } catch(err) {
        logger.error(err)
        next()
    }
})

module.exports = PostRoute