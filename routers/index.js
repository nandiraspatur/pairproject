// require libraries
const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()

// require model
const Model = require('../models')

// define the home page route
router.get('/', function(req, res) {
  res.render('index')
  // res.send('Welcone To Cinema Hacktiv8')
})

router.get('/signup', function(req, res) {
  res.render('signup', {error: false})
})

router.post('/signup', function(req, res) {
  Model.User.create(req.body)
  .then(() => {
    res.redirect('/signin')
  })
  .catch(error => {
    res.render('signup', {error: true})
  })
})

router.get('/signin', function(req, res) {
  res.render('signin', {error: false})
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
        Model.Profile.findOne({where : {UserId: req.session.UserId}})
        .then(profile => {
          if(profile) {
            res.redirect('/movies')
          } else {
            res.redirect('/profile/create')
          }
        })
      } else {
        res.render('signin', {error: true})
      }
    });
  })
  .catch(error => {
    res.render('signin', {error: true})
  })
})

module.exports = router
