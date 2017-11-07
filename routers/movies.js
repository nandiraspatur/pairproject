const express = require('express')
const router = express.Router()

// define the profile page route
router.get('/', function(req, res) {
  res.render('movies/index')
})

router.post('/', function(req, res) {
  res.redirect('/movies/book')
})

router.get('/book', function(req, res) {
  res.render('movies/book')
})

router.post('/book', function(req, res) {
  res.redirect('/movies/confirm')
})

router.get('/book/confirm', function(req, res) {
  res.render('movies/confirm')
})

router.post('/book/confirm', function(req, res) {
  res.redirect('/movies')
})

module.exports = router
