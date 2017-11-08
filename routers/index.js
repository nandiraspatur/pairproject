const express = require('express')
const router = express.Router()

// define the home page route
router.get('/', function(req, res) {
  res.render('index')
  // res.send('Welcone To Cinema Hacktiv8')
})

router.get('/signup', function(req, res) {
  res.render('signup')
})

router.post('/signup', function(req, res) {
  res.render('signup')
})

router.get('/signin', function(req, res) {
  res.render('signin')
})

router.post('/signin', function(req, res) {
  res.render('sigin')
})

module.exports = router
