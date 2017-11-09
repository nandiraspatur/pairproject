// require libraries
const express = require('express')
const router = express.Router()

// require model
const Model = require('../models')

// define the profile page route
router.get('/', function(req, res) {
  Model.Profile.findOne({where: {UserId: req.session.UserId}})
  .then(profile => {
    res.render('profile/index', {dataProfile: profile, auth:req.session.auth})
  })
})

router.get('/create', function(req, res) {
  res.render('profile/create', {UserId: req.session.UserId, error: false, auth:req.session.auth})
})

router.post('/create', function(req, res) {
  req.body.UserId = req.session.UserId
  Model.Profile.create(req.body)
  .then(() => {
    res.redirect('/profile')
  })
  .catch(error => {
    // res.send(error.errors[0].message)
    let errorMsg = error.errors[0].message
    res.render('profile/create', {UserId: req.session.UserId, error: errorMsg, auth:req.session.auth})
  })
})

router.get('/edit', function(req, res) {
  Model.Profile.findOne({where: {UserId: req.session.UserId}})
  .then(profile => {
    res.render('profile/edit', {dataProfile: profile, auth:req.session.auth})
  })
})

router.post('/edit', function(req, res) {
  console.log(req.body);
  Model.Profile.update(req.body, {where: {UserId: req.session.UserId}})
  .then(profile => {
    res.redirect('/profile')
  })
})

// router.get('/changepassword', function(req, res) {
//   Model.User.findById(req.session.UserId)
//   .then(user => {
//     res.send(user)
//   })
// })

module.exports = router
