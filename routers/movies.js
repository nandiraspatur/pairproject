const express = require('express')
const router = express.Router()
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })
const getCodeTicket = require('../helper/getCodeTicket')

const Model = require('../models');

// define the profile page route
router.get('/', function(req, res) {
  Model.Movie.findAll().then(movies => {
    // res.send(movies)
    res.render('movies/index', {movies:movies})
  })
})

router.get('/add', function (req,res) {
  Model.Schedule.findAll().then(schedules => {
    res.render('movies/add', {schedules:schedules})
  })
})

router.post('/add', upload.single('pic'), function (req, res, next) {
  req.body.picture_name = req.file.filename
  console.log(req.body);
  Model.Movie.create(req.body).then(() => {
    res.redirect('/movies')
  })
})

router.get('/:id', function (req, res) {
  Model.Movie.findById(req.params.id, {
    include :{
      model: Model.Schedule
    }
  }).then(movie => {
    // res.send(movie)
    res.render('movies/detail', {movie:movie})
  })
})

router.get('/:id/book', function(req, res) {
  Promise.all([
    Model.Movie.findById(req.params.id, {
      include: {
        model: Model.Schedule
      }
    }),
    Model.Profile.findOne({where:{UserId:req.session.UserId}})
  ]).then(rows => {
    // res.send(movie)
    res.render('movies/book', {movie:rows[0], profile:rows[1]})
  })
})

router.get('/:id/book/confirm', function(req, res) {
  Model.Profile.findOne({where:{UserId:req.session.UserId}}).then(profile => {
    let date = new Date()
    let pm = {
      MovieId:req.params.id,
      ProfileId:profile.id,
      buy_date:date.toISOString(),
      ticket_code: getCodeTicket()
    }
    console.log(pm);
    Model.ProfileMovie.create(pm).then(() => {
      res.redirect('/profile/history')
    })
  })
})

router.post('/book/confirm', function(req, res) {
  res.redirect('/movies')
})

module.exports = router
