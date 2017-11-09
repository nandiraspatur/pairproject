// require libraries
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

const auth = require('./helpers/checkAuth')

// require routers
const index = require('./routers/index')
const profile = require('./routers/profile')
const movies = require('./routers/movies')
const schedules = require('./routers/schedules')

// invoke express
const app = express()

// set view engine
app.set('view engine', 'ejs')
app.use(express.static('./public'))

// use middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  secret: 'hacktiv8'
}))


// website routes
app.use('/', index)
app.use('/profile', auth, profile)
app.use('/movies', movies)
app.use('/schedules', schedules)

// app port
app.listen(3000, () => {
  console.log('Listening on port 3000..')
})
