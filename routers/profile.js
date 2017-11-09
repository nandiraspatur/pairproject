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
    if(profile){
      res.render('profile/index', {profile: profile, sessions:req.session, title:'Profile'})
    }else{
      res.redirect('/profile/create')
    }
  })
})

router.get('/create', function(req, res) {
  res.render('profile/create', {UserId: req.session.UserId, error: false, sessions:req.session,  title:'Tambah Data Profile'})
})

router.post('/create', upload.single('pic'), function (req, res, next) {
  if(req.file){
    req.body.picture_name = req.file.filename
  }
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
    res.render('profile/edit', {dataProfile: profile, sessions:req.session, title:'Edit Profile'})
  })
})

router.post('/edit', function(req, res) {
  Model.Profile.update(req.body, {where: {UserId: req.session.UserId}})
  .then(profile => {
    res.redirect('/profile')
  })
})

router.get('/history', (req, res) => {
  if(req.session.role == 'admin'){
    Model.ProfileMovie.findAll({
      include:[
        {model: Model.Movie},
        {model: Model.Profile}
      ]
    }).then(dataHistory => {
      res.render('profile/history', {history:dataHistory, sessions:req.session,  title:'Riwayat Pembelian'})
      // res.send(dataHistory)
    })
  }else{
    Model.Profile.findOne({where:{UserId:req.session.UserId}}).then(profile => {
      Model.ProfileMovie.findAll({
        include:{
          model: Model.Movie
        },
        where:{ProfileId:profile.id}
      }).then(dataHistory => {
        res.render('profile/history', {history:dataHistory, sessions:req.session,  title:'Riwayat Pembelian'})
        // res.send(dataHistory)
      })
    })
  }
})

module.exports = router
