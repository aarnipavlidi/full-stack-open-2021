const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const database = process.env.MONGODB_URI

console.log('Trying to connect to the following database ==>', database)

mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }).then(result => {
  console.log(result)
  console.log('Connected to the database successfully!')
}).catch((error) => {
  console.log('There was problem while trying connect to the database:', error.message)
})

const mongoFrame = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true
  }
})

mongoFrame.plugin(uniqueValidator)

mongoFrame.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('persons', mongoFrame)
