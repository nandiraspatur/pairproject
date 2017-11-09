const express = require('express')
const router = express.Router()
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })
const getCodeTicket = require('../helpers/getCodeTicket')
const nodemailer = require('../helpers/nodemailer')
const smsGateway = require('../helpers/smsGateway')
const auth = require('../helpers/checkAuth')

const Model = require('../models');

// define the profile page route
router.get('/', function(req, res) {
  Model.Movie.findAll().then(movies => {
    // res.send(movies)
    res.render('movies/index', {movies:movies, sessions:req.session,  title:'Daftar Film'})
  })
})

router.get('/add', auth, function (req,res) {
  Model.Schedule.findAll().then(schedules => {
    res.render('movies/add', {schedules:schedules, sessions:req.session,  title:'Tambah Film Baru'})
  })
})

router.post('/add', auth, upload.single('pic'), function (req, res, next) {
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
    res.render('movies/detail', {movie:movie, sessions:req.session,  title:'Detail Film'})
  })
})

router.get('/edit/:id', auth, function(req,res) {
  Promise.all([
    Model.Movie.findById(req.params.id),
    Model.Schedule.findAll()
  ]).then(rows => {
    res.render('movies/edit', {movie: rows[0], schedules:rows[1], sessions:req.session, title:'Edit Film'})
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
  res.render('movies/book', {sessions:req.session})
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
    if(rows[1]){
      res.render('movies/book', {movie:rows[0], profile:rows[1], sessions:req.session,  title:'Booking Film'})
    }else{
      res.redirect('/profile/create')
    }
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
          phone_number: dataOrder.Profile.phone_number,
          buyDate: dataOrder.buy_date,
          movieTitle: dataOrder.Movie.title,
          ticketPrice: dataOrder.Movie.ticket_price,
          movieSchedule: dataOrder.Movie.Schedule.time,
          movieStudio: dataOrder.Movie.Schedule.studio,
          profileName: dataOrder.Profile.getFullName(),
          profileEmail: dataOrder.Profile.email
        }
        // res.send(dataTransaction)
        smsGateway(dataTransaction.ticket, dataTransaction.phone_number)
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
