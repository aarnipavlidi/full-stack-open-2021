## 7.17: kommentit, step1

For this exercise I had to do some changes into "blogilista" task, which can be found:

https://github.com/aarnipavlidi/full-stack-open-2021/tree/main/Task04/blogilista


1) Adding file => "../controllers/comments.js"

```javascript
const commentsRouter = require('express').Router()
const Blog = require('../models/blogModel')
const Comments = require('../models/commentsModel')

commentsRouter.post('/:id/comments', async (request, response) => {

  try {

    const getBlogContent = await Blog.findById(request.params.id)

    const newCommentValue = new Comments({
      message: request.body.message,
      blog: request.params.id
    })

    const savedCommentValue = await newCommentValue.save()

    getBlogContent.comments = getBlogContent.comments.concat(savedCommentValue)
    await getBlogContent.save()

    response.json(savedCommentValue.toJSON())

  } catch (error) {
    console.log(error.message)
    return response.status(404).json({ errorMessage: 'There was a problem while trying to add new comment to the database. Please try again later! :)' })
  }
})

module.exports = commentsRouter
```

2) Adding file => "../models/commentsModel.js"

```javascript
const mongoose = require('mongoose')

const commentsData = mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  },
})

commentsData.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Comment', commentsData)
```

3) Changing code (at line 16) => "../controllers/blogNotes.js"

```javascript
const getValues = await Blog.find({}).populate('user', { username: 1, name: 1 }).populate('comments')
```

4) Changing code (after line 23) => "../models/blogModel.js"

```javascript
comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
```

5) Changing code (after line 10) => "app.js"

```javascript
const commentRouter = require('./controllers/comments')
```

6) Changing code (at line 54) => "app.js"

```javascript
app.use('/api/blogs', blogRouter, commentRouter)
```
