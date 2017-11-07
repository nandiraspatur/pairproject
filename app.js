// require libraries
const express = require('express')
const bodyParser = require('body-parser')

// require routers
const index = require('./routers/index')
const profile = require('./routers/profile')
const movies = require('./routers/movies')

// invoke express
const app = express()

// set view engine
app.set('view engine', 'ejs')

// use middleware to encode
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// website routes
app.use('/', index)
app.use('/profile', profile)
app.use('/movies', movies)

// app port
app.listen(3000, () => {
  console.log('Listening on port 3000..')
})
