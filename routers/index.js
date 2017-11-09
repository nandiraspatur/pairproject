// require libraries
const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()

// require model
const Model = require('../models')

// define the home page route
router.get('/', function(req, res) {
  Model.Movie.findAll({limit:4}).then(movies => {
    // res.send(movies)
    console.log(req.session);
    res.render('index', {movies:movies, sessions:req.session, title:'Home Page'})
  })
})

router.get('/signup', function(req, res) {
  if(req.session.auth) {
    res.redirect('/profile')
  } else {
    res.render('signup', {error: false, sessions:req.session, title:'Registrasi'})
  }
})

router.post('/signup', function(req, res) {
  Model.User.create(req.body)
  .then(() => {
    res.redirect('/signin')
  })
  .catch(error => {
    // res.send(error.errors[0].message)
    let errorMsg = error.errors[0].message
    res.render('signup', {error: errorMsg, sessions:req.session, title:'Registrasi'})
  })
})

router.get('/signin', function(req, res) {
  if(req.session.auth) {
    res.redirect('/profile')
  } else {
    res.render('signin', {error: false, sessions:req.session,  title:'Sign In'})
  }
})

router.post('/signin', function(req, res) {
  Model.User.findOne({
    where: {username: req.body.username}
  })
  .then(user => {
    bcrypt.compare(req.body.password, user.password).then(function(success) {
      if(success) {
        req.session.auth = true
        req.session.UserId = user.id
        req.session.username = req.body.username
        req.session.role = user.role
        console.log(req.session);
        Model.Profile.findOne({where : {UserId: req.session.UserId}})
        .then(profile => {
          if(profile) {
            res.redirect('/movies')
          } else {
            res.redirect('/profile/create')
          }
        })
      } else {
        let errorMsg = error.errors[0].message
        // res.send(errorMsg)
        res.render('signin', {error: errorMsg, sessions:req.session})
      }
    });
  })
  .catch(error => {
    res.render('signin', {error: true, sessions:req.session})
  })
})

router.get('/logout', (req, res) => {
  req.session.destroy(function(err) {
    res.redirect('/signin')
  })
})

module.exports = router
