const express = require('express')
const router = express.Router()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const Model = require('../models');

// define the profile page route
router.get('/', function(req, res) {
  Model.Movie.findAll().then(movies => {
    // res.send(movies)
    res.render('movies/index', {movies:movies})
  })
})

router.get('/add', function (req,res) {
  res.render('movies/add')
})

router.post('/add', upload.single('pic'), function (req, res, next) {
  console.log(req.body);
  console.log(req.file);
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})

router.get('/edit/:id', function(req,res) {
  Model.Movie.findById(req.params.id).then(movie => {
    res.render('movies/edit', {movie: movie})
  }).catch(error => {
    res.send(error)
  })
})

router.post('/edit/:id', upload.single('pic'), function(req,res, next) {
  Model.Movie.update(req.body, {where: req.params}).then(() => {
    res.redirect('/movies')
  }).catch(error => {
    res.send(error)
  })
})

router.get('/delete/:id', function(req, res) {
  Model.Movie.destroy({where: req.params}).then(() => {
    res.redirect('/movies')
  }).catch(error => {
    res.send(error)
  })
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
