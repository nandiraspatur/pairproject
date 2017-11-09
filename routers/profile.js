// require libraries
const express = require('express')
const router = express.Router()
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })

// require model
const Model = require('../models')

// define the profile page route
router.get('/', function(req, res) {
  Model.Profile.findOne({
    where: {UserId: req.session.UserId},
    include: {
      model: Model.Movie
    }
  })
  .then(profile => {
    res.render('profile/index', {dataProfile: profile, sessions:req.session})
  })
})

router.get('/create', function(req, res) {
  res.render('profile/create', {UserId: req.session.UserId, error: false, sessions:req.session})
})

router.post('/create', upload.single('pic'), function (req, res, next) {
  req.body.picture_name = req.file.filename
  req.body.UserId = req.session.UserId
  Model.Profile.create(req.body)
  .then(() => {
    res.redirect('/profile')
  })
  .catch(error => {
    // res.send(error.errors[0].message)
    let errorMsg = error.errors[0].message
    res.render('profile/create', {UserId: req.session.UserId, error: errorMsg, sessions:req.session})
  })
})

router.get('/edit', function(req, res) {
  Model.Profile.findOne({where: {UserId: req.session.UserId}})
  .then(profile => {
    res.render('profile/edit', {dataProfile: profile, sessions:req.session})
  })
})

router.post('/edit', function(req, res) {
  Model.Profile.update(req.body, {where: {UserId: req.session.UserId}})
  .then(profile => {
    res.redirect('/profile')
  })
})

router.get('/history', (req, res) => {
  Model.Profile.findOne({where:{UserId:req.session.UserId}}).then(profile => {
    Model.ProfileMovie.findAll({
      include:{
        model: Model.Movie
      },
      where:{ProfileId:profile.id}
    }).then(dataHistory => {
      res.render('profile/history', {history:dataHistory, auth:req.session})
      // res.send(dataHistory)
    })
  })
})

module.exports = router
