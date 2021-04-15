require('dotenv').config()

const ShowData = require('./models/persons')
const express = require('express')
const morgan = require('morgan')
const program = express()

program.use(express.static('build'))

program.use(morgan(':method :url :status :res[content-length] - :response-time ms :showPostData'))

morgan.token('showPostData', function(request) {
  return JSON.stringify(request.body)
})

program.get('/info', (request, response, next) => {
  ShowData.find({}).then(showResult => {
    const serverTimeDate = new Date().toGMTString()
    const countPersons = showResult.length
    response.send(`<h4>There is total of ${countPersons} different persons inside phonebook! <br><br> ${serverTimeDate} (Greenwich Mean Time)</h4>`)
    console.log('Database has currently:')
    console.log(countPersons)
    console.log('different persons listed on the phonebook')
  }).catch(error => next(error))
})

program.get('/api/persons', (request, response, next) => {
  ShowData.find({}).then(showResult => {
    response.json(showResult)
    console.log(showResult)
  }).catch(error => next(error))
})

program.get('/api/persons/:id', (request, response, next) => {
  ShowData.findById(request.params.id).then(showResult => {
    if (showResult) {
      response.json(showResult)
      console.log(showResult)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error))
})

program.use(express.json())

program.post('/api/persons', (request, response, next) => {
  const getValue = request.body

  if (!getValue.name || !getValue.number) {
    console.log('No emptry values! Please add either name or number and try again! :)')
    return response.status(400).json({
      errorMessage: 'Some content is missing, please try again! :)'
    })
  }

  const buildData = new ShowData({
    name: getValue.name,
    number: getValue.number
  })

  buildData.save().then(showResult => {
    response.json(showResult)
    console.log(showResult)
  }).catch(error => next(error))
})

program.put('/api/persons/:id', (request, response, next) => {
  const getValue = request.body

  const updateData = {
    name: getValue.name,
    number: getValue.number
  }

  ShowData.findByIdAndUpdate(request.params.id, updateData, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
      console.log(updatedPerson)
    })
    .catch(error => next(error))
})

program.delete('/api/persons/:id', (request, response, next) => {
  ShowData.findByIdAndRemove(request.params.id).then(showResult => {
    console.log(showResult)
    response.status(204).end()
  }).catch(error => next(error))
})

const errorHandler = (error, request , response, next) => {
  console.log(error.message)
  console.log(error.name)

  if (error.name === 'CastError') {
    console.log('Error happened while doing something, check Chrome or Postman for more info! :)')
    return response.status(400).send({ errorMessage: 'You tried to search, update, or delete person, whose id doesnt exist on the database as of right now. Please try again! :)' })
  } else if (error.name === 'ValidationError') {
    console.log('Error happened while trying to add or update person to the database, check Chrome or Postman for more info! :)')
    return response.status(400).json({ errorMessage: error.message })
  }

  next(error)
}

program.use(errorHandler)

const port = process.env.PORT

program.listen(port, () => {
  console.log(`Server is running on following port => ${port}`)
})
