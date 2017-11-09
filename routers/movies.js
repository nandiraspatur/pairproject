const express = require('express')
const router = express.Router()
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })
const getCodeTicket = require('../helpers/getCodeTicket')
const nodemailer = require('../helpers/nodemailer')
const auth = require('../helpers/checkAuth')

const Model = require('../models');

// define the profile page route
router.get('/', function(req, res) {
  Model.Movie.findAll().then(movies => {
    // res.send(movies)
    res.render('movies/index', {movies:movies})
  })
})

router.get('/add', auth, function (req,res) {
  Model.Schedule.findAll().then(schedules => {
    res.render('movies/add', {schedules:schedules})
  })
})

router.post('/add', auth, upload.single('pic'), function (req, res, next) {
  req.body.picture_name = req.file.filename
  console.log(req.body);
  Model.Movie.create(req.body).then(() => {
    res.redirect('/movies')
  })
})

router.get('/:id', auth, function (req, res) {
  Model.Movie.findById(req.params.id, {
    include :{
      model: Model.Schedule
    }
  }).then(movie => {
    // res.send(movie)
    res.render('movies/detail', {movie:movie})
  })
})

router.get('/edit/:id', auth, function(req,res) {
  Model.Movie.findById(req.params.id).then(movie => {
    res.render('movies/edit', {movie: movie})
  }).catch(error => {
    res.send(error)
  })
})

router.post('/edit/:id', auth, upload.single('pic'), function(req,res, next) {
  Model.Movie.update(req.body, {where: req.params}).then(() => {
    res.redirect('/movies')
  }).catch(error => {
    res.send(error)
  })
})

router.get('/delete/:id', auth, function(req, res) {
  Model.Movie.destroy({where: req.params}).then(() => {
    res.redirect('/movies')
  }).catch(error => {
    res.send(error)
  })
})

router.get('/book', auth, function(req, res) {
  res.render('movies/book')

})

router.get('/:id/book', auth, function(req, res) {
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

router.get('/:id/book/confirm', auth, function(req, res) {
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
      Model.ProfileMovie.findOne({
        where: {MovieId: pm.MovieId, ProfileId: pm.ProfileId},
        include: [{
          model: Model.Movie,
          include: Model.Schedule
        }, Model.Profile]
      }).then(dataOrder => {
        let dataTransaction = {
          ticket: dataOrder.ticket_code,
          buyDate: dataOrder.buy_date,
          movieTitle: dataOrder.Movie.title,
          ticketPrice: dataOrder.Movie.ticket_price,
          movieSchedule: dataOrder.Movie.Schedule.time,
          movieStudio: dataOrder.Movie.Schedule.studio,
          profileName: dataOrder.Profile.getFullName(),
          profileEmail: dataOrder.Profile.email
        }
        // res.send(dataTransaction)
        nodemailer(dataTransaction)
        res.redirect('/profile/history')
      })
    })
  })
})

router.post('/book/confirm', auth, function(req, res) {
  res.redirect('/movies')
})

module.exports = router
