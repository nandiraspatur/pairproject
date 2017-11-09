// require libraries
const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()

// require model
const Model = require('../models')

router.get('/', (req, res) => {
  Model.Schedule.findAll({
    include:{
      model: Model.Movie
    }
  }).then(schedules => {
    // res.send(schedules)
    res.render('schedules', {schedules:schedules, auth:req.session.auth})
  })
})

module.exports = router
