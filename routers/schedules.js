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
    res.render('schedules', {schedules:schedules, sessions:req.session,  title:'Jadwal Film'})
  })
})

router.get('/:id', (req, res) => {
  Model.Schedule.findById(
    req.params.id,
    {
      include: {
        model: Model.Movie
      }
    }
  ).then(schedule => {
    // res.send(time)
    res.render('schedules/time', {schedule:schedule, sessions:req.session,  title:'Daftar Film Jadwal'})
  })
})

module.exports = router
